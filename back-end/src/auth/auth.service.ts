import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { LogInDto } from './dto/login.dto';
import { RefreshToken } from './schemas/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid'
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private UserModle: Model<User>,
    @InjectModel(RefreshToken.name) private RefreshTokenModle: Model<RefreshToken>,
    private jwtService: JwtService,
  ) { }

  async signup(signUpData: SignUpDto) {
    const { email, username, password } = signUpData
    try {
      const emailInUse = await this.UserModle.findOne({ email: email })
      if (emailInUse) {
        throw new BadRequestException("Email already in use");
      }
      const hashedPassword = await bcrypt.hash(password, 10)

      await this.UserModle.create(
        {
          email, username, password: hashedPassword
        })
    } catch (error) {
      throw new BadRequestException(error);
    }

  }

  async refreshTokens(refreshToken: string) {
    const token = await this.RefreshTokenModle.findOneAndDelete(
      {
        token: refreshToken,
        expiryDate: { $gte: new Date() }
      }
    )

    if (!token) {
      throw new UnauthorizedException('Refresh Token in invalid')
    }

    return this.userTokenGenerate(token.userId)
  }

  async login(logInData: LogInDto) {
    const { email, password } = logInData
    try {
      const user = await this.UserModle.findOne({ email })
      if (!user) {
        throw new UnauthorizedException("Email invalide !");
      }
      const hashedPasswordCompare = await bcrypt.compare(password, user.password)

      if (!hashedPasswordCompare) {
        throw new UnauthorizedException("Password incorrect !");
      }
      const tokens = await this.userTokenGenerate(user._id)

      return {
        ...tokens,
        userId: user._id
      }

    } catch (error) {
      throw new BadRequestException(error);
    }

  }

  async userTokenGenerate(userId) {
    const accessToken = this.jwtService.sign({ userId })
    const refreshToken = uuidv4()

    await this.storeRefreshToken(refreshToken, userId)
    return { accessToken, refreshToken }
  }

  async storeRefreshToken(token: string, userId) {
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 3)
    await this.RefreshTokenModle.create({ token, userId, expiryDate })
  }

}
