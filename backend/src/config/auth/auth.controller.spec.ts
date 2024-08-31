import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return an access token if login is successful', async () => {
      const loginDto: LoginDTO = { username: 'testuser', password: 'testpass' };
      const result = { access_token: 'test.jwt.token' };

      jest.spyOn(authService, 'login').mockResolvedValue(result);

      expect(await authController.login(loginDto)).toEqual(result);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });

    it('should throw an error if login fails', async () => {
      const loginDto: LoginDTO = {
        username: 'testuser',
        password: 'wrongpass',
      };

      jest
        .spyOn(authService, 'login')
        .mockRejectedValue(new Error('User not valid'));

      await expect(authController.login(loginDto)).rejects.toThrow(
        'User not valid',
      );
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });
  });
});
