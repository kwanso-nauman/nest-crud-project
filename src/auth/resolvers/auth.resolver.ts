import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/auth/jwt- auth.guard';
import { LoginResponse } from '../dto/login-response';
import { LoginUserInput } from '../dto/login-user-input';
import { Auth } from '../entities/auth.entity';
import { AuthService } from '../services/auth.service';



@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => LoginResponse)
  @UseGuards(JwtAuthGraphQLGuard)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }
}
