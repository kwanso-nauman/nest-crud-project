import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginUserInput } from '../dto/login-user-input';
import { LoginResponse } from '../dto/login-response';
import { Auth } from '../entities/auth.entity';
import { AuthService } from '../services/auth.service';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => LoginResponse)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }
}
