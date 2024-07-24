import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { TokenModule } from 'src/token/token.module';
import { TokenService } from 'src/token/token.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[JwtModule.register({
    secret:process.env.SECRET_KEY,
  }),
    TokenModule,
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,TokenService,],
  exports: [AuthService],
})
export class AuthModule {}
