import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
export type User = any;

@Injectable()
export class UsersService {
   private users = [
      {
         "id": 1,
         "username": "David",
         "password": "1234",
         "role": "INTERN"
      },
      {
         "id":2,
         "username": "Daret",
         "password": "1234",
         "role": "ADMIN"
      }
   ]
   async findOne(username:string): Promise<User | undefined> 
   {
      return this.users.find(user => user.username === username)
   }
}
