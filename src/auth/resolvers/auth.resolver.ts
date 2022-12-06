import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse } from '../dto/login-response';
import { LoginUserInput } from '../dto/login-user-input';
import { SignupResponse } from '../dto/signup-response';
import { SignupUserInput } from '../dto/signup-user-input';
import { Auth } from '../entities/auth.entity';
import { AuthService } from '../services/auth.service';



@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => LoginResponse)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }

  @Mutation(() => SignupResponse)
  signup(@Args('signupUserInput') signupUserInput: SignupUserInput) {
    return this.authService.signup(signupUserInput);
  }

}
