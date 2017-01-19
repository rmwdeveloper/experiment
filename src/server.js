import 'babel-polyfill';
import path from 'path';
import express from 'express';
import session from 'express-session';

import sequelize_fixtures from 'sequelize-fixtures';

import multer from 'multer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import compression from 'compression';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import PrettyError from 'pretty-error';
import passport from 'passport';

import ReactDOM from 'react-dom/server';
import models, { User, FileSystem, IndexIndicatorGroup, NodeIndex, FileNode, FileNodeMetadata  } from './data/models';
// todo : better way to import these fixtures?
import indexIndicatorGroupsFixture from './data/fixtures/indexIndicatorGroups';
import nodeIndicesFixture from './data/fixtures/nodeIndices';
import fileNodesFixture from './data/fixtures/fileNodes';
import fileNodeMetadataFixture from './data/fixtures/fileNodeMetadata';
import fileNodeChildrenFixture from './data/fixtures/fileNodeChildren';

import sequelize from './data/sequelize';
import routes from './routes';
import { resolve } from 'universal-router';
import { port, analytics, auth, aws_secret_key, session_secret } from './config';
import { Strategy as LocalStrategy } from 'passport-local';


import assets from './assets';
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';

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

passport.serializeUser(function(user, done) {
  const { id } = user.get({ plain: true });
  done(null, id);
  return null;
});
//
passport.deserializeUser(function(id, done) {
  User.findById(id)
    .then(user => {
      const {username, email, emailConfirmed, id} = user.get({plain:true});
      done(null, {username, email, emailConfirmed, id});
      return null;
    })
    .catch(err => {
      done(err, null);
      return null;
    });
});


passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  (username, password, cb) => {
    User.findOne({ where: { email: username } })
    .then(user => {
      if (user === null) {
        cb(null, false);
        return null;
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          cb(null, user);
          return null;
        }
        cb(null, false);
        return null;
      });
    });
}));


app.post('/register', (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if ( err ) {
        res.status(400);
        res.send('Error');
      }
      else if ( hash ) {

        const initialIndexIndicatorGroups = indexIndicatorGroupsFixture.map( indexObject => { const {name} = indexObject.data; return { name } });
        const initialFileNodeMetadata = fileNodeMetadataFixture.map( fileNodeMetadata => { const { name, value} = fileNodeMetadata.data; return {name, value} });
        const initialNodeIndices = nodeIndicesFixture.map( nodeObject => { const {nodeIndex} = nodeObject.data; return nodeIndex;});
        const initialNodeChildrenIndices = fileNodeChildrenFixture.map( childIndex => { const {nodeIndex} = childIndex.data; return nodeIndex;});

        sequelize.transaction( transaction => {

          // return FileSystem.create({diskSpace: 50}, {transaction}).then(fileSystem => {
          //   console.log('fileSystem', fileSystem.get({plain: true}));
          // })
          return User.create({username: req.body.username, email:req.body.email, password: hash}, {transaction}).then(user => {
            const { id } = user.get({plain: true});
            return FileSystem.create({diskSpace: 50, UserId: id}, {transaction}).then(fileSystem => {
              const { id } = fileSystem.get({plain: true});
              const initialFileNodes = fileNodesFixture.map( fileNode =>
              { const { name, permissions, extension, nodeIndex } = fileNode.data; return { name, nodeIndex, permissions, extension, FileSystemId: id }; });
              return FileNode.bulkCreate(initialFileNodes, {transaction, individualHooks: true}).then(fileNodes => {
                const fileNodeData = fileNodes.map( node => { return node.get({plain: true})});
                console.log(fileNodeData);
              });

              // initialFileNodes.forEach(fileNodeValues => {
              //   const {name, permissions, extension } = fileNodeValues;
              //   return FileNode.create({name, permissions, extension});
              // });
              // return Promise.all(initialFileNodes).then(fileNodeValues => {
              //   const {name, permissions, extension } = fileNodeValues;
              //   return FileNode.create({name, permissions, extension});
              // })
            })
          })
        }).then( result => {
          res.status(200);
          res.send(result);
          return null;
        }).catch(error => {
          console.log(error);
          res.status(400);
          res.send('Error');
          return null;
        });


        // FileSystem.create({diskSpace: 50,
        //   User: {username: req.body.username, email:req.body.email, password: hash} },
        //   {include: [User, FileNode]})
        //   .then(item => {
        //     res.status(200);
        //     res.send('Success');
        //     return null;
        //   })
        //   .catch(errorObject => {
        //     res.status(400);
        //     console.log(errorObject);
        //     res.send(errorObject.errors);
        //     return null;
        //   });
      }
    });
  });
});
app.post('/login',
  passport.authenticate('login', { successRedirect: '/success', failureRedirect: '/failure', session: true })
);
app.get('/get_user', (req, res) => {
  const UserId = req.user ? req.user.id : 1; // Either logged in user, or guest ID ( 1 )
  FileSystem.findOne({where: {UserId}, include: [
    {
    model: User,
    attributes: ['id', 'username','email','emailConfirmed']
    },
    {
      model: IndexIndicatorGroup,
      attributes: ['name'],
      include: [{
        model: NodeIndex,
        attributes: ['nodeIndex'],
      }]
    },
  ]})
    .then(fileSystem=>{
    res.send(fileSystem.get({plain: true}));
    return null;
  }).catch(err=>{
    // todo: put in a logginsg statement
    return null;
  });
});
app.get('/logout', (req, res) => {
  req.logout();

  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
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

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated())
//     return next();
//
//   res.sendStatus(401);
// }
/*
* Return server time, check if user has enough space for upload. If user does have enough space,
* create an Upload model instance for this particular upload.
* */
app.get('/upload_start', (req, res) => {
  console.log(req.user);
  // console.log('req user is . . .', req.user);

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
  res.send(date);
});

app.post('/upload_complete', (req, res) => {
  console.log(req.user);
  res.send({});
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
app.get('/success', async(req, res) => {
  res.status(200).send(req.user);
});

app.get('/failure', async(req, res) => {

  res.status(403).send('failure');
});
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

    /*
     *
     */
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

// Upload route
// app.post('/upload', (req, res) => {
//   res.send('Got an upload request!');
// });



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
    sequelize_fixtures.loadFile(path.join(__dirname, '..', 'src', 'data', 'fixtures', 'initial_data.js'), {User,
      FileSystem, IndexIndicatorGroup, NodeIndex, FileNode, FileNodeMetadata}).then(function(){
      console.log(`The server is running at http://localhost:${port}/`);
    }).catch(err => { console.log(err)});
  });
});

// sequelize_fixtures.loadFile(path.join(__dirname, '..', 'src', 'data', 'fixtures', 'initial_data.js'), {User, FileSystem}).then(function(){
//   models.sync().catch(err => console.error(err.stack)).then(() => {
//     app.listen(port, () => {
//       console.log(`The server is running at http://localhost:${port}/`);
//     });
//   });
// }).catch(err => {console.log(err)});

/* eslint-enable no-console */
