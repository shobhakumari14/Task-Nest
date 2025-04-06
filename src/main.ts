import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import CookieParser from 'cookie-parser';
import CookieSession from 'cookie-session';
import * as dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3003',
      'http://localhost:3001',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });
  
  
  app.use(CookieParser());
  app.use(CookieSession({ keys: ['404dieueyf7huienejnfef403'] }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  //-----===NEST-SWAGGER-API-DOCUMENTATION-PART===-----------------
  const configDoc = new DocumentBuilder()
    .setTitle('NestJs-Task-Nest Project Application')
    .setDescription('NestJs Microservices Application/ TaskApp/ JWT-Authentication/ Cookie-Session-Authentication/ Unit-Testing/ Integration-Testing')
    .setVersion('')
    .setContact(
      'Shobha',
      'https://www.eventhq.io/',
      'shobhak1411@gmail.com',
    )
    // .addTag('project', "CRUD Operations")
    .build();

  // const swaggerDocOptions: SwaggerDocumentOptions = {
  //   deepScanRoutes: true,
  // };

  const collapseApiTag = {
    swaggerOptions: {
      docExpansion: 'none',
    },
  };
  const swaggerDocSpecs = SwaggerModule.createDocument(app, configDoc);
  SwaggerModule.setup('playground', app, swaggerDocSpecs, collapseApiTag);
  //-------------------------END------------------------------------------

  await app.listen(port);
}
bootstrap();

