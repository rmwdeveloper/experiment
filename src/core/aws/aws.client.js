import { aws_bucket_name, aws_key, aws_region, aws_secret_key } from '../../config';

export function constructDownloadURL(awsKey) {
  return `https://s3-${aws_region}.amazonaws.com/${aws_bucket_name}/${awsKey}`;
}