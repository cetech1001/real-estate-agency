import Logger from 'bunyan';

export default new Logger({
  name: 'Real Estate',
  streams: [
    {
      stream: process.stdout,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      level: (process.env.LOG_LEVEL as any) || 'debug',
    },
    {
      path: 'trace.log',
      level: 'trace',
    },
  ],
  serializers: {
    req: Logger.stdSerializers.req,
    res: Logger.stdSerializers.res,
    err: Logger.stdSerializers.err,
  },
});
