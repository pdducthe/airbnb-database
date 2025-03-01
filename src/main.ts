import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(express.static("src"))

  const config = new DocumentBuilder()
  .setTitle("AIRBNB")
  .setDescription('/swagger/v1/swagger.json')
  .setVersion('2.0')
  // .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup("/swagger",app,document)

  await app.listen(8060);
}
bootstrap();
