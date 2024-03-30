import { ICookie } from './../../interfaces/index';
export function generateCookie(userId:string, role:string):ICookie{
  return{
    userId:userId,
    role:role
  }
}