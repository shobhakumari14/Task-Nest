import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Logger } from 'bs-logger';
import { Request, Response } from 'express';
import { REQUEST } from '@nestjs/core';
import { LoggerService } from 'src/common/services';

@Injectable()
export class UserAgentMiddleware implements NestMiddleware
{
    private logger: Logger;
    constructor(
        logger: LoggerService,
        @Inject(REQUEST) private request: Request,
    )
    {
        this.logger = logger.getLogger('UserAgentMiddleware.name');
    }


    /**this is for getting the user-browser detail using request-header of expressjs */
    use(req: Request, res: Response, next: Function)
    {
        const userAgent = req.headers['user-agent'];
        const ipAddress = req.ip;
        console.log('userHeader------', userAgent);
        console.log('IP-------', ipAddress);
        const headerValue = req.headers['header-name'];
        console.log('headerValue-------', headerValue);
        const authorizationHeader = req.headers['authorization'];
        console.log('authorizationHeader-------', authorizationHeader);
        
        next();
    }
}