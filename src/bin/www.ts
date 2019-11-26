#!/usr/bin/env node

/**
 * Module dependencies.
 */

import debug from 'debug';
import http from 'http';
import app from '../app';
import logger from '../lib/logger';
import config from '../config';
import db from '../lib/db';

debug('real-estate:server');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string): boolean | number | string {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onError(error: { syscall: string; code: any }): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    : `port ${addr.port}`;
  logger.info(`Listening on ${bind}`);
  debug(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */

db.connect(config.database.uri)
  .then(() => {
    server.listen(port);
    logger.info('Database connected');
  })
  .catch((reason) => {
    logger.error(reason);
  });

server.on('error', onError);
server.on('listening', onListening);
