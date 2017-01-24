import AWS from 'aws-sdk';
import { aws_bucket_name, aws_key, aws_region, aws_secret_key } from '../config';
const s3 = new AWS.S3();

const exec = require('child_process').exec;

const baseCommand = `aws s3 ls --summarize --recursive s3://${aws_bucket_name}/`;

export function doesObjectExist(keyName) {
  return new Promise((resolve, reject) => {
    s3.headObject({Bucket: aws_bucket_name, Key: keyName}, ( err, data ) => {
      err ? reject(err) : resolve(data);
    });
  });
}
export function getDirectorySize() {
  return new Promise((resolve, reject) => {
    exec(baseCommand, (err, stdout, stderr) => {
      const testVal = JSON.parse(stdout);
      console.log(typeof(testVal));
      console.log(testVal);
      err ? reject({err, stderr, stdout}) : resolve(JSON.stringify(stdout));
    });
  });
}