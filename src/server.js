import 'babel-polyfill';
import path from 'path';
import express from 'express';
import session from 'express-session';
import winston from 'winston';
import multer from 'multer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import compression from 'compression';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import PrettyError from 'pretty-error';
import passport from './core/passport';
import ReactDOM from 'react-dom/server';
import models, { User, FileSystem, FileNode, FileNodeMetadata, Upload, TextDocument } from './data/models';
import { fileNodesFixture, fileNodesMetadataFixture } from './data/fixtures';
import sequelize from './data/sequelize';
import routes from './routes';
import { resolve } from 'universal-router';
import { port, analytics, auth, aws_secret_key, session_secret } from './config';
import { getDirectorySize, doesObjectExist, createDirectory } from './core/aws';
import { getUser } from './core/auth';
import assets from './assets';
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';


winston.configure({
  transports: [
    new (winston.transports.File)({ filename: 'server.log' })
  ]
});

const SequelizeStore = require('connect-session-sequelize')(session.Store);
// todo: Make configuration handle both http (local development) and https (production)
const app = express();
const upload = multer();
app.use(compression());
//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

// Allow Cross Domain Requests
// const allowCrossDomain = function(req, res, next) { // eslint-disable-line
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// };


const sessionConfig = {
  secret: 'keyboard cat',
  store: new SequelizeStore({
    db: sequelize
  }),
  resave: false, // we support the touch method so per the express-session docs this should be set to false
  // proxy: true // if you do SSL outside of node.};
};
//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'windows')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session(sessionConfig)); // todo: figure out how the hell cookies work with SSL
app.use(passport.initialize());
app.use(passport.session());
// app.use(flash());

// app.use(allowCrossDomain);

// app.use(expressJwt({
//   secret: auth.jwt.secret,
//   credentialsRequired: false,
//   /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
//   getToken: req => req.cookies.id_token,
//   /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
// }));


app.post('/register', (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) {
        res.status(400);
        res.send('Error');
        return null;
      } else if (hash) {
        return sequelize.transaction(transaction => {
          return User.create({ username: req.body.username, email: req.body.email, password: hash }, { transaction }).then(user => {
            const userObj = user.get({ plain: true });
            return FileSystem.create({ diskSpace: 50, UserId: userObj.id }, { transaction }).then(fileSystem => {
              const fileNodes = fileNodesFixture.map(fileNode => {
                if (fileNode.nodeIndex === 4) {
                  fileNode.name = req.body.username; //   TODO : refactor
                }
                fileNode.FileSystemId = fileSystem.get({ plain: true }).id;
                return fileNode;
              });
              return FileNode.bulkCreate(fileNodes, { transaction, individualHooks: true }).then(fileNodeRows => {
                const promises = [];
                const plainFileNodeData = fileNodeRows.map( rowData => {
                  return rowData.get({ plain: true });
                });
                for (let iterator = 0; iterator < fileNodeRows.length; iterator++) {
                  const rowData = fileNodeRows[iterator].get({plain: true});
                  const fixtureData = fileNodesFixture[rowData.nodeIndex - 1];
                  if ( fixtureData.parentNodeIndex !== undefined ){
                    const parentNodeRow = plainFileNodeData.find( element => { return element.nodeIndex === fixtureData.parentNodeIndex });
                    promises.push(FileNode.update({FileNodeId: parentNodeRow.id}, {where: {id: rowData.id}, transaction }));
                  }
                }

                for (let iterator = 0; iterator < fileNodesMetadataFixture.length; iterator++) {
                  const nodeThatHasMetadata = plainFileNodeData.find(element => {
                    return parseInt(fileNodesMetadataFixture[iterator].nodeIndex, 10) === parseInt(element.nodeIndex, 10);
                  });
                  if (nodeThatHasMetadata) {
                    fileNodesMetadataFixture[iterator].FileNodeId = nodeThatHasMetadata.id;
                  }
                  const { name, value, FileNodeId } = fileNodesMetadataFixture[iterator];
                  const newPromise = FileNodeMetadata.create({ name, value, FileNodeId }, { transaction });
                  promises.push(newPromise);
                }

                return Promise.all(promises).then( (results) => {
                  return results;
                });
              });

            });
          });
        })
        .then(() => {
          getUser(req.body.username).then(userObj => {
            req.logIn(userObj, error => {
              if (error) {
                return null;
              }
              res.status(200).send(userObj);
              return null;
            });
          });
          return null;
        }).catch(errorObj => {
          res.status(403).send(errorObj.errors);
          res.send(errorObj.errors);
          return null;
        });
      }
    });
  });
});

app.post('/login',
  passport.authenticate('login', { successRedirect: '/success', failureRedirect: '/failure', session: true })
);
app.get('/get_user', (req, res) => {
  const username = req.user ? req.user.username : 'Guest'; // Either logged in user, or guest ID ( 1 )
  getUser(username).then(userObj => {
    res.status(200).send(userObj);
    return null;
  });
});
//todo : Add a get user middleware so not doing this for every single view.

app.post('/delete_files', (req, res) => {
  const username = req.user ? req.user.username : 'Guest'; // Either logged in user, or guest ID ( 1 )
  const { toDelete } = req.body;
  getUser(username).then(userObj => {
    const { FileSystem: {id} } = userObj.get({plain: true});
    // todo: Batch delete possible? For some reason association hook not being called
    // todo: when doing bulk destroy.
    toDelete.forEach( nodeToDelete => { // todo: convert to sequelize transaction.
      FileNode.findOne({ where: {FileSystemId: id, nodeIndex: nodeToDelete }}).then( node => {
        node.destroy();
      });
    });
    return null;
  });
});

app.post('/create_folder', (req, res) => {
  const username = req.user ? req.user.username : 'Guest';
  const { newNodeIndex, newNode, location } = req.body;
  getUser(username).then(userObj => {
    const { FileSystem: {id} } = userObj.get({ plain: true });
    return sequelize.transaction( transaction => {
      return FileNode.create({ ...newNode, FileNodeId: location, nodeIndex: newNodeIndex, FileSystemId: id }, {transaction}).then( fileNode => {
        const metadataRows = Object.keys(newNode.metadata).map(name => {
          return { name, value: newNode.metadata[name], FileNodeId: fileNode.get({ plain: true }).id };
        });
        return FileNodeMetadata.bulkCreate(metadataRows, { transaction });
      });
    });
  });
});

app.post('/move_file', (req, res) => {
  const username = req.user ? req.user.username : 'Guest';
  const { fromNodeIndex, toNodeIndex, originsParentIndex, parentalIndex } = req.body;
  getUser(username).then(userObj => {
    const { FileSystem: {id} } = userObj.get({ plain: true });
    FileNode.findOne({ where: { nodeIndex: toNodeIndex, FileSystemId: id } }).then(toNode => {
      // console.log(toNode.get({plain: true}));
      FileNode.update({ FileNodeId: toNode.get({plain: true}).id }, { where: { FileSystemId: id, nodeIndex: fromNodeIndex } }).then( result => {
        'use strict';

      }).catch(err => {
        console.log(err);
      })
    });

  });
});

app.post('/move_files', (req, res) => {
  const username = req.user ? req.user.username : 'Guest';
  const { fromIndices, fromParentIndex, toNodeIndex } = req.body;

  getUser(username).then(userObj => {
    const { FileSystem: {id} } = userObj.get({ plain: true });
    FileNode.findOne({ where: { nodeIndex: toNodeIndex, FileSystemId: id } }).then(toNode => {
      FileNode.update({ FileNodeId: toNode.get({plain: true}).id}, { where: { FileSystemId: id, nodeIndex: { $in: fromIndices} }});
    });
  });
});


app.get('/logout', (req, res) => {
  req.logout();

  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});

app.get('/success', async(req, res) => {
  getUser(req.user.username).then(userObj => {
    res.status(200).send(userObj);
    return null;
  });
});

app.get('/failure', async(req, res) => {
  res.status(403).send('failure');
});
//
// Register API middleware
// -----------------------------------------------------------------------------
// app.use('/graphql', expressGraphQL(req => ({
//   schema,
//   graphiql: true,
//   rootValue: { request: req },
//   pretty: process.env.NODE_ENV !== 'production',
// })));


/*
* Return server time, check if user has enough space for upload. If user does have enough space,
* create an Upload model instance for this particular upload.
* */
app.get('/upload_start', (req, res) => {
  const id = req.user ? req.user.id : 1;
  const now = new Date(Date.now());
  const date = {
    year: now.getFullYear(),
    month: now.getMonth() + 1, // getMonth is 0 indexed.
    day: now.getDate(),
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
    milliseconds: now.getMilliseconds()
  };

  doesObjectExist(`${id}/`).then(response => {
    getDirectorySize(`${id}/`).then(size => {
      res.status(200).send({ usedSpace: size, date });
    });
  }).catch(error => { //User ID doesnt exist, this is the user's first upload.
    createDirectory(`${id}/`).then(() => {
      res.status(200).send({ usedSpace: 0, date });
    });
  });
});

app.post('/upload_complete', (req, res) => {
  // console.log(req.body.newNode);
  // console.log(req.body.awsKey);
  const username = req.user ? req.user.username : 'Guest'; // Either logged in user, or guest ID ( 1 )
  getUser(username).then(userObj => {
    const FileSystemId = userObj.get({plain: true}).FileSystem.id; //todo: Abract away into filenode create helper.
    const { name, permissions, extension, nodeIndex, metadata } = req.body.newNode;

    return sequelize.transaction( transaction => {
      return FileNode.create({name, permissions, extension, nodeIndex, FileSystemId, FileNodeId: req.body.parentIndex}, {transaction}).then(fileNode => {
        const { id } = fileNode.get({plain: true});
        const promises = [];
        Object.keys(metadata).forEach(key => { promises.push(FileNodeMetadata.create({name: key, value: metadata[key], FileNodeId: id }, {transaction})); });
        promises.push(Upload.create({location: req.body.awsKey,extension: req.body.extension, UserId: userObj.get({plain: true}).id,
          FileNodeId: id, fileSize: req.body.size, uploadComplete: true}, {transaction}));
        return Promise.all(promises).then( (results) => {
          return results;
        });
      });

    }).then(result => {
      res.status(200).send('Ok!');

    }).catch(error => {
      console.log(error);
    });

  });
  return null;
});

app.get('/sign_aws', async(req, res) => {
  res.send(crypto
    .createHmac('sha1', aws_secret_key)
    .update(req.query.to_sign)
    .digest('base64')
  );
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------

app.get('*', async(req, res, next) => {
  try {
    let css = [];
    let statusCode = 200;
    const template = require('./views/index.jade'); // eslint-disable-line global-require
    const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };
    if (process.env.NODE_ENV === 'production') {
      data.trackingId = analytics.google.trackingId;
    }
    const store = configureStore({}, {
      cookie: req.headers.cookie,
    });

    store.dispatch(setRuntimeVariable({
      name: 'initialNow',
      value: Date.now(),
    }));


    await resolve(routes, {
      path: req.url,
      query: req.query,
      context: {
        store,
        insertCss: styles => css.push(styles._getCss()), // eslint-disable-line no-underscore-dangle
        setTitle: value => (data.title = value),
        setMeta: (key, value) => (data[key] = value),
      },
      render(component, status = 200) {
        css = [];
        statusCode = status;
        data.state = JSON.stringify(store.getState());
        data.state = {};
        data.body = ReactDOM.renderToString(component);
        data.css = css.join('');
        return true;
      },
    });
    res.status(statusCode);
    res.send(template(data));
  } catch (err) {
    next(err);
  }
});


//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const template = require('./views/error.jade'); // eslint-disable-line global-require
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.send(template({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  }));
});


//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
// app.listen(port, () => {
//   console.log(`The server is running at http://localhost:${port}/`);
// });

/* eslint-disable no-console */

models.sync().catch(err => console.error(err.stack)).then(() => {
  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
  });
});


/* eslint-enable no-console */
