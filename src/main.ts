import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookie from 'cookie-parser'
import {DocumentBuilder,SwaggerModule} from '@nestjs/swagger'

async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule);
  app.use(cookie())
  app.enableCors({
    origin:['http://localhost:5173','http://127.0.0.1:5500'],
    credentials:true,
    methods:["POST","PUT","PATCH","DELETE","GET"]
  })

  app.setGlobalPrefix("/v1/api")
  const PORT = process.env.PORT || 8000 

  const config = new DocumentBuilder() 
    .setTitle("Blog app api")
    .setDescription(`<span>This api's some paths are open for everyone</span> <br><a href="https://t.me/@unnamed00000">Contact with Developer</a>`)
    .setVersion('1.0')
    .addBearerAuth({
      type:"http",
      in:'header',
      scheme:"bearer",
      description:"Enter token",
      name:"JWT",
      bearerFormat:"JWT"
    })
    .build()

  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup("v1/api",app,document)

  await app.listen(PORT);
  console.log(`App is working on port ${await app.getUrl()}`)
}
bootstrap();
