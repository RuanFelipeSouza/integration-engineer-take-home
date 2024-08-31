import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from './user.dto';
import { UserModel } from '../database/schemas/user.schema';
import { UserService } from './users.service';

describe('UserService', () => {
  let userService: UserService;
  let userModel: Model<UserDTO>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(UserModel.name),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<UserDTO>>(getModelToken(UserModel.name));
  });

  describe('findOne', () => {
    it('should return a user when found by username', async () => {
      const user: UserDTO = { username: 'testuser', password: 'testpass' };

      jest.spyOn(userModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(user),
      } as any);

      const result = await userService.findOne('testuser');

      expect(result).toEqual(user);
      expect(userModel.findOne).toHaveBeenCalledWith({ username: 'testuser' });
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(userModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await userService.findOne('nonexistent');

      expect(result).toBeNull();
      expect(userModel.findOne).toHaveBeenCalledWith({
        username: 'nonexistent',
      });
    });
  });
});
