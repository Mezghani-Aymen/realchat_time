import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { LogInDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModle: Model<User>,
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

      return this.jwtTokenGenerate(user.id);
    } catch (error) {
      throw new BadRequestException(error);
    }

  }

  async jwtTokenGenerate(userId) {
    const accessToken = this.jwtService.sign({ userId })
    return accessToken
  }

}
