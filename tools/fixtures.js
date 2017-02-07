/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import sequelize_fixtures from 'sequelize-fixtures';
import models,  { User, FileSystem, FileNode, FileNodeMetadata, TextDocument } from '../src/data/models';
import { port } from '../src/config';
/**
 * Creates application bundles from the source files.
 */
function fixtures() {
  return new Promise((resolve, reject) => {
    models.sync().catch(err => { return reject(err.stack)}).then(() => {
      sequelize_fixtures.loadFile(path.join(__dirname, '..', 'src', 'data', 'fixtures', 'initial_data.js'), {User,
        FileSystem, FileNode, FileNodeMetadata, TextDocument}).then(() => {
        console.log(' Fixtures loaded successfully');
        return resolve();
      }).catch(err => { return reject(err);});
    });
  });
}


export default fixtures;
