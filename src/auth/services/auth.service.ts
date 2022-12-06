import { ForbiddenException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { LoginUserInput } from '../dto/login-user-input';
import { JwtService } from '@nestjs/jwt'
import { SignupUserInput } from '../dto/signup-user-input';
import * as bcrypt from 'bcrypt';

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
    const user = await this.usersService.findOneByEmail(loginUserInput.email);
    const { password, ...result } = user;
    return {
      access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
      user: result
    }
  }

  async signup(signupUserInput: SignupUserInput) {
    try {
      //duplicate email check
      const existingUser = await this.usersService.findOneByEmail(signupUserInput.email);
      if (existingUser) {
        throw new ForbiddenException({
          status: HttpStatus.FORBIDDEN,
          error: 'User already exists with this email',
        });

      }
      //hash password
      const password = await bcrypt.hash(signupUserInput.password, 10)

      return this.usersService.create({
        ...signupUserInput,
        password,
      })
    } catch (err) {
      throw new InternalServerErrorException(err);
    }

  }

  /**
  * Verify users service
  * @param token 
  * @returns  jwt object with roles
  */
  async verify(token: string) {

    const secret = await this.jwtService.verify(token);
    const user = await this.usersService.findOne(secret.sub);

    return {
      ...secret,
      user: user
    };
  }
}
