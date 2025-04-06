import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Logger } from 'bs-logger';
import { NextFunction, Request, Response } from 'express';
import { REQUEST } from '@nestjs/core';
import { LoggerService } from 'src/common/services';
const textToImage = require('text-to-image');

@Injectable()
export class CaptchaMiddleware implements NestMiddleware {
   private logger: Logger;
   constructor(
      logger: LoggerService,
      @Inject(REQUEST) private request: Request,
   ) {
      this.logger = logger.getLogger('CaptchaMiddleware.name');
   }

   /**this is for getting the captcha */
   async use(req: Request, res: Response, next: NextFunction) {

      var captcha = randomWords(6)
      var sess = req.session;
      sess.captcha = captcha;
      const dataUri = await textToImage.generate(`${captcha}`, 
      {
         maxWidth: 100,
      });
      const img = dataUri.split(",")[1];
      const image = Buffer.from(img, "base64");
      res.writeHead(200, {
         "Content-Type": "image/png",
         "Content-Length": image.length,
      });
      res.end(image);
   }
}

  /**to generate random words for captcha */
export function randomWords(length: number) {
   var result = '';
   var imageChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

   var imageCharLength = imageChar.length;
   for (var i = 0; i < length; i++) {
      result += imageChar.charAt(Math.floor(Math.random() * imageCharLength));
   }
   return result;
}