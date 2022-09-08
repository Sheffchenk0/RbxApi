import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUsers() {
    return 'get';
  }
  postUsers() {
    return 'post';
  }
}
