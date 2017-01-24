import AWS from 'aws-sdk';
import { aws_bucket_name } from '../config';
const s3 = new AWS.S3();

export function getBucketSize() {
  return s3.getObject()
}