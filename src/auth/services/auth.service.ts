import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { LoginUserInput } from '../dto/login-user-input';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user
      return result;
    }
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.usersService.findOne(loginUserInput.email);
    const { password, ...result } = user;
    return {
      access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
      user: result
    }
  }
}
