import bunyan from 'bunyan';
import format from 'bunyan-format';

const debug = std => std.isTTY ? format({outputMode: 'long', out: std}) : std;

export default bunyan.createLogger({
  name: 'ReactUniversal',
  src: true,
  serializers: {
    req: bunyan.stdSerializers.req,
    err: bunyan.stdSerializers.err
  },
  streams: [
    {
      level: 'debug',
      stream: debug(process.stdout)
    }
  ]
});