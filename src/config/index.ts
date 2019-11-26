import 'dotenv/config';

function getMongoDBURI(): string {
  const host = process.env.MONGODB_HOST;
  const port = `${process.env.MONGODB_PORT}`;
  const db = process.env.MONGODB_DATABASE;
  const user = process.env.MONGODB_USERNAME;
  const pass = process.env.MONGODB_PASSWORD;

  let uri = 'mongodb://';

  if (user && pass) {
    uri += `${user}:${pass}@`;
  }

  return `${uri}${host}:${port}/${db}`;
}

export default {
  database: {
    uri: getMongoDBURI(),
  },
  sessionSecret: process.env.SESSION_SECRET,
};
