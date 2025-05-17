import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class GatewayController {
  constructor() {}

  @ApiExcludeEndpoint()
  @Get('')
  home() {
    return 'Welcome to the MapleStory Web Backend Gateway!';
  }

  @Get('ping')
  ping() {
    return 'pong';
  }
}
