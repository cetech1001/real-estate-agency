"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bunyan_1 = __importDefault(require("bunyan"));
exports.default = new bunyan_1.default({
    name: 'Real Estate',
    streams: [
        {
            stream: process.stdout,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            level: process.env.LOG_LEVEL || 'debug',
        },
        {
            path: 'trace.log',
            level: 'trace',
        },
    ],
    serializers: {
        req: bunyan_1.default.stdSerializers.req,
        res: bunyan_1.default.stdSerializers.res,
        err: bunyan_1.default.stdSerializers.err,
    },
});
