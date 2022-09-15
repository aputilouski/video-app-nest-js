import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { User } from '../model/user.schema';
import { UserService } from '../service/user.service';
import { JwtService } from '@nestjs/jwt';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userServerice: UserService, private jwtService: JwtService) {}

  @Post('/signup')
  async Signup(@Res() response, @Body() user: User) {
    await this.userServerice.signup(user);
    return response.status(HttpStatus.CREATED).end();
  }

  @Post('/signin')
  async SignIn(@Res() response, @Body() user: User) {
    const data = await this.userServerice.signin(user, this.jwtService);
    return response.status(HttpStatus.OK).json(data);
  }
}
