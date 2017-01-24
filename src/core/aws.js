import AWS from 'aws-sdk';
import { aws_bucket_name, aws_key, aws_region, aws_secret_key } from '../config';
const s3 = new AWS.S3();

const exec = require('child_process').exec;

const baseCommand = `aws s3 ls --summarize --human-readable --recursive s3://${aws_bucket_name}/1/`;

export function getDirectorySize() {
  return new Promise((resolve, reject) => {
    exec(baseCommand, (err, stdout, stderr) => {
      err ? reject({err, stderr, stdout}) : resolve({stdout, stderr});
    });
  });
}