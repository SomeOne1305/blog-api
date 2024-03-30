import {registerAs} from '@nestjs/config'
import {RedisClientOptions} from 'redis'

export default registerAs('redis',():RedisClientOptions=>({
  password:process.env.REDIS_PASS,
  socket:{
    host:process.env.REDIS_HOST,
    port:+process.env.REDIS_PORT
  }
}))