import { database_name_secret,
  database_username_secret,
  database_password_secret,
  database_host_secret,
  database_dialect_secret,
  aws_signer_url_secret,
  aws_key_secret,
  aws_bucket_name_secret,
  aws_region_secret,
  aws_time_url_secret
  } from './secret';

export const database_name = database_name_secret;
export const database_username = database_username_secret;
export const database_password = database_password_secret;
export const database_host = database_host_secret;
export const database_dialect = database_dialect_secret;

export const aws_signer_url = aws_signer_url_secret;
export const aws_key = aws_key_secret;
export const aws_bucket_name = aws_bucket_name_secret;
export const aws_region = aws_region_secret;
export const aws_time_url = aws_time_url_secret;

export const port = process.env.PORT || 8080;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;
export const aws_url = process.env.AWS_URL || 'Https://s3.amazonaws.com';


export const evap_config = {
  signerUrl: awsInfo.signerUrl,
  aws_key: awsInfo.aws_key,
  bucket: awsInfo.bucket_name,
  aws_url: `https://s3-${awsInfo.aws_region}.amazonaws.com`,
  timeUrl: awsInfo.timeUrl,
  maxConcurrentParts: 10,
  // computeContentMd5: true,
  // allowS3ExistenceOptimization: true,
  logging: false,
};

export const analytics = {

  // https://analytics.google.com/
  google: { trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-XXXXX-X' },

};
export const databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';

export const auth = {

  jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },

  // https://developers.facebook.com/
  facebook: {
    id: process.env.FACEBOOK_APP_ID || '186244551745631',
    secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc',
  },

  // https://cloud.google.com/console/project
  google: {
    id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
    secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd',
  },

  // https://apps.twitter.com/
  twitter: {
    key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
    secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
  },

};
