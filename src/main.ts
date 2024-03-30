import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookie from 'cookie-parser'

async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule);
  app.use(cookie())
  app.enableCors({
    origin:['http://localhost:5173','http://127.0.0.1:5500'],
    credentials:true,
    methods:["POST","PUT","PATCH","DELETE","GET"]
  })
  const PORT = process.env.PORT || 8000 
  app.setGlobalPrefix("/v1/api")
  await app.listen(PORT);
  console.log(`App is working on port ${await app.getUrl()}`)
}
bootstrap();
