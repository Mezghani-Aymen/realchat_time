import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModle: Model<User>) { }

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
}
