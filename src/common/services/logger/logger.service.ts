// import { Injectable, Scope, Logger, Inject } from '@nestjs/common';
// import { REQUEST } from '@nestjs/core';
// import { Request } from 'express';
// import { SessionUser } from '../../../interface/session-user.interface';

// @Injectable({ scope: Scope.TRANSIENT})
// export class LoggerService extends Logger {
//     constructor(@Inject(REQUEST) private readonly request: Request) {
//         super();
//     }
//     public setContext(context: string): void {
//         const user: SessionUser = (this.request as any).user;
//         const traceId: string = (this.request as any).traceId;
//         const requestPath: string = this.request.path;
//         const requestMethod: string = this.request.method;
//         if (user) {
//             context = `[ Authenticated: ${user.orgId} ] ${context}`;
//         }
//         if (requestPath) {
//             context = `${requestPath} ${context}`;
//         }
//         if (requestMethod) {
//             context = `${requestMethod} ${context}`;
//         }
//         if (traceId) {
//             context = `<${traceId}> ${context}`;
//         }
//         this.context = context;
//     }
// }

import {
    createLogger,
    LogContexts,
    Logger,
    LogLevels,
    LogMessage,
    LogTarget,
    logLevelNameFor
} from 'bs-logger';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { path } from 'app-root-path';
import { createWriteStream, existsSync, mkdirSync, WriteStream } from 'fs';
import { join } from 'path';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
// import { SessionUser } from '../../../interface/session-user.interface';
/**
 * Class for generating LoggerInstances<br>
 * 1. Run LoggerFactory.setup({format: (log:string) => string})
 * 2. Then use LoggerFactory.getLogger(className: string) to get logger instances
 */
@Injectable()
export class LoggerService 
{
    constructor(
        private config?: ConfigService,
        @Inject(REQUEST) private request?: Request
    )
    {
        this.createLoggerInstance();
    }

    private createLoggerInstance(): void 
    {
        if(this.loggerInstance)
        {
            return;
        }
        let applicationLog = false;
        let unauthenticatedLog = false;
        if(!this.request)
        {
            unauthenticatedLog = true;
        }
        if(!this.config)
        {
            applicationLog = true;
        }
        const allowFileLog = this.config ? this.config.get<string>('LOG_FILE') : true;

        const returnLogString = (m: LogMessage) => 
        {
            return `${m.sequence} ${logLevelNameFor(m.context.logLevel).toUpperCase()} [ ${m.context.namespace} ] ${new Date(
                m.time
            ).toISOString()} ${m.message}`;
        };

        const formatter = (m: LogMessage) => 
        {
            m.message = this.format(m.message);
            let text = returnLogString(m);
            if(m.context.logLevel === LogLevels.debug)
            {
                text = '\x1b[37m ' + text + '\x1b[0m';
            }
            return text;
        };

        const targets: LogTarget[] = [];
        if(process.env.NODE_ENV !== 'test')
        {
            targets.push({
                format: formatter,
                minLevel: LogLevels.trace,
                stream: process.stdout
            });
        }
        if (allowFileLog && Boolean(allowFileLog)) 
        {
            let fileName = `${process.env.NODE_ENV}.log`;
            if(applicationLog)
            {
                fileName = 'app_' + fileName;
            }
            else if(unauthenticatedLog)
            {
                fileName = 'offlineLog_' + fileName;
            }
            const logDir = 'logs';
            const fullPath = join(path, logDir);
            if (!existsSync(fullPath)) 
            {
                mkdirSync(fullPath);
            }
            const wr = createWriteStream(join(fullPath, fileName), {
                autoClose: true,
                flags: 'a+'
            });
            let fileFormatter = returnLogString;
            let fileLogMinLevel = LogLevels.info;
            if(process.env.NODE_ENV === 'test')
            {
                fileFormatter = formatter;
                fileLogMinLevel = LogLevels.debug;
            }
            targets.push({
                format: fileFormatter,
                minLevel: fileLogMinLevel,
                stream: wr
            });
        }
        const l = createLogger({
            targets
        });
        this.loggerInstance = l;
    }
    /**
     * @param className string, class name will be appended to all logs<br>
     * @returns an instance of bs-logger Logger<br>
     * @throws {@link ServiceError} if LoggerFactory.setup is not run first
     */
    public getLogger(className: string): Logger 
    {
        if(!this.loggerInstance)
        {
            this.createLoggerInstance();
        }
        const l = this.loggerInstance.child({
            [LogContexts.namespace]: className
        });
        return l;
    }
    /**
     * @private <br>
     * @description Parent logger instance created using {@link LoggerFactory.setup}
     */
    private loggerInstance: Logger;
    private format(log: string): string 
    {
        if(!this.request)
        {
            return log;
        }
        // const user: SessionUser = (this.request as any).user;
        const traceId: string = (this.request as any).traceId;
        const requestPath: string = this.request.originalUrl;
        const requestMethod: string = this.request.method;
        // if (user) 
        // {
        //     log = `[ Authenticated: ${user.orgId} ] ${log}`;
        // }
        if (requestPath) 
        {
            log = `${requestPath} ${log}`;
        }
        if (requestMethod) 
        {
            log = `${requestMethod} ${log}`;
        }
        if (traceId) 
        {
            log = `<${traceId}> ${log}`;
        }
        return log;
    }
}
