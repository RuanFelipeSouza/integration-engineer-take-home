import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../database/schemas/user.schema';
import { UserDTO } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel.name) private userModel: Model<UserDTO>) {}

  async create(user: UserDTO): Promise<UserDTO> {
    try {
      const { username, password } = user;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new this.userModel({
        username,
        password: hashedPassword,
      });
      return newUser.save();
    } catch {
      throw new BadRequestException('Not possible to create user');
    }
  }

  async findOne(username: string): Promise<UserDTO> {
    return await this.userModel.findOne({ username }).exec();
  }
}
