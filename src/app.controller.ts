import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/status')
  getHello(){
    const status  = [{
      status:200,
      DB:this.appService.checkStatus(),
      message:'OK'
    }]
    
    
    return status
  }
  @Get('vars')
  sendVars(){
    return this.appService.sendVars()
  }
}
