import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { warn } from 'console';
export type User = any;

@Injectable()
export class UsersService {
   private users = [
      {
         "id": 1,
         "username": "Davit",
         "password": "1234",
         "roles": ["ADMIN"],
         "iat": 1672531200,
         "exp": 1672617600
      },
      {
         "id":2,
         "username": "Dared",
         "password": "1234",
         "roles": ["USER"],
         "iat": 1672531200,
         "exp": 1672617600
      }
   ]
   async findOne(username:string): Promise<User | undefined> 
   {
      return this.users.find(user => user.username === username)
   }
   async findAll()
   {
         return this.users
   }

}
