import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './resolvers/auth.resolver';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './jwt-strategy';
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    signOptions: { expiresIn: '60s' },
    secret: process.env.JWT_SECRET || 'secret',
  })],
  providers: [AuthResolver, AuthService, JwtStrategy]
})
export class AuthModule { }
