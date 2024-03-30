import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {InjectConnection} from '@nestjs/mongoose'
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private readonly connection: Connection,
    private readonly config:ConfigService
  ){}
  checkStatus():boolean{
    const isConnected : boolean = this.connection.readyState === 1
    return isConnected
  }
  sendVars(){
    return{
        user:this.config.get('MAIL_USER'), 
        pass:this.config.get('MAIL_PASS')
      }
  }
}
