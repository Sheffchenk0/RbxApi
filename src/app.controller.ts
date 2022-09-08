import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private appService: AppService) {}

  @Post('/users')
  getUsers() {
    return this.appService.getUsers();
  }
}
