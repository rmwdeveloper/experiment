import { database_name_secret,
  database_username_secret,
  database_password_secret,
  database_host_secret,
  database_dialect_secret,
  aws_signer_url_secret,
  aws_key_secret,
  aws_secret_key_secret,
  aws_bucket_name_secret,
  aws_region_secret,
  aws_time_url_secret,
  session_secret_secret
  } from './secret';

export const database_name = database_name_secret;
export const database_username = database_username_secret;
export const database_password = database_password_secret;
export const database_host = database_host_secret;
export const database_dialect = database_dialect_secret;

export const aws_signer_url = aws_signer_url_secret;
export const aws_key = aws_key_secret;
export const aws_secret_key = aws_secret_key_secret;
export const aws_bucket_name = aws_bucket_name_secret;
export const aws_region = aws_region_secret;
export const aws_time_url = aws_time_url_secret;

export const session_secret = session_secret_secret;

export const evap_config = {signerUrl: aws_signer_url, aws_key, bucket: aws_bucket_name, awsSignatureVersion: 2,
  aws_url: `https://s3-${aws_region}.amazonaws.com`, maxConcurrentParts: 10, logging: false,
  };

export const port = process.env.PORT || 8080;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;


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
