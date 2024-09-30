import pino from "pino";
import pinoHTTP from "pino-http";

const logger = pino({
  transport: {
    targets: [
      {
        target: "pino-pretty",
        options: {
          ignore: "pid,hostname",
          singleLine: true,
        },
      },
    ],
  },
  name: "Server",
});

const middleware = pinoHTTP({
  logger,
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      headers: req.headers?.authorization
        ? { authorization: req.headers.authorization }
        : undefined,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
});

export { logger, middleware };
