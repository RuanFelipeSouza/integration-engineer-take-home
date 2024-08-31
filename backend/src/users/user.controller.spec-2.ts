import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './users.service';
import { UserDTO } from './user.dto';
import { BadRequestException } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      const user: UserDTO = { username: 'testuser', password: 'testpass' };
      jest.spyOn(userService, 'create').mockResolvedValue(user);

      const result = await userController.create(user);

      expect(result).toEqual(user);
      expect(userService.create).toHaveBeenCalledWith(user);
    });

    it('should throw BadRequestException if username or password is missing', async () => {
      const user: Partial<UserDTO> = { username: 'testuser' };

      await expect(userController.create(user as UserDTO)).rejects.toThrow(
        BadRequestException,
      );
      expect(userService.create).not.toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by username', async () => {
      const user: UserDTO = { username: 'testuser', password: 'testpass' };
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);

      const result = await userController.findOne('testuser');

      expect(result).toEqual(user);
      expect(userService.findOne).toHaveBeenCalledWith('testuser');
    });

    it('should throw BadRequestException if username is missing', async () => {
      await expect(userController.findOne('')).rejects.toThrow(
        BadRequestException,
      );
      expect(userService.findOne).not.toHaveBeenCalled();
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      const result = await userController.findOne('nonexistent');

      expect(result).toBeNull();
      expect(userService.findOne).toHaveBeenCalledWith('nonexistent');
    });
  });
});
