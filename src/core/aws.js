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
export function getDirectorySize(Prefix) {
  return new Promise((resolve, reject) => {
    let size = 0;
    s3.listObjectsV2({Bucket: aws_bucket_name, Prefix}, (err, data) => {
      data.Contents.forEach((item) => {
        size += item.Size;
      });
      err ? reject(err) : resolve(size);
    });
  });
}