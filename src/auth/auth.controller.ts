import { Controller, HttpException, Post, NotFoundException, HttpStatus, ValidationPipe, ForbiddenException, UseGuards } from '@nestjs/common';
import { Headers, Param, Query, Body, Req, HttpCode } from '@nestjs/common/decorators';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ParameterObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
// import { Body, Post } from '@nestjs/common/decorators';
import { JwtService } from '@nestjs/jwt/dist';
// import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiExtraModels, ApiHeader, ApiOperation, ApiParam, ApiPropertyOptional, ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { DangNhapView } from './dto/signin.dto';
import { ThongTinNguoiDung } from './dto/signup.dto';
import { Token } from '../dto/token.dto';
import { TokenService } from 'src/token/token.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@ApiTags("Auth")
@Controller('/api/auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwt: JwtService,
        private tokenService: TokenService,
    ) { }

    //SIGNUP
    @HttpCode(201)
    @Post("/signup")
    @ApiBody({ type: ThongTinNguoiDung, required: true })
    // @UseGuards(AuthGuard("jwt"))
    public async signup(
        @Body() body: ThongTinNguoiDung,
        // @Headers() headers: Token
    )
        : Promise<any> {
        // let data = await this.tokenService.checkToken(headers)
        if (true) {
            const { name, email, pass_word, phone, birth_day, gender, role } = body;
            return this.authService.signup(name, email, pass_word, phone, birth_day, gender, role)
        }

        else {
            // return this.tokenService.checkToken(headers)
        }
    }


    //SIGNIN
    @ApiBody({ type: DangNhapView, required: true })
    @UseGuards(JwtAuthGuard)
    @Post("/signin")
    async signin(@Body() body: DangNhapView,
       
    ): Promise<any> {
        const { email, pass_word } = body;
            let checkLogin = await this.authService.signin(email, pass_word);

            if (checkLogin.check) {
                return {
                    statusCode: 200,
                    message: "Signin thành công",
                    content: {
                        user: checkLogin.user,
                        token: checkLogin.token
                    },
                    dateTime: checkLogin.jsonDate
                }
            }
            else {
                throw new HttpException({
                    statusCode: 404,
                    message: checkLogin.data,
                }, HttpStatus.NOT_FOUND);
            }
    }

}
