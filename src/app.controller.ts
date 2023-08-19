import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { IRaised } from 'models/IRaised';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private appService: AppService) {}

  @Post('/users')
  postRaised(@Req() req: Request<IRaised>) {
    const { name, raised } = req.body;
    if (name && raised) return this.appService.postRaised(req.body);
  }
  @Post('/string')
  postRaisedString(@Req() req: Request<{ str: string; name: string }>) {
    const { str, name } = req.body;
    if (str && name) {
      const splitArr = str.split(' ');
      if (splitArr[3]) {
        this.appService.postRaised({ name: name, raised: +splitArr[3] });
      }
    }
  }
}
