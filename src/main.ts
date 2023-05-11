import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

const CookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(CookieSession({ keys: ['teranaamliya'] }));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  //-----===NEST-SWAGGER-API-DOCUMENTATION-PART===-----
  const configDoc = new DocumentBuilder()
    .setTitle('NestJs-Project Application')
    .setDescription('The API Application')
    .setVersion('')
    .setContact(
      'EventHQ',
      'https://www.eventhq.io/',
      'shobha.kumari@eventhq.com',
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
  SwaggerModule.setup('swagger', app, swaggerDocSpecs, collapseApiTag);
  //-------------------------END------------------------

  await app.listen(3000);
}
bootstrap();
