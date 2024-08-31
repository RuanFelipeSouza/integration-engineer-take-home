import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './login.dto';
import { UserService } from '../../users/users.service';
import { UserDTO } from '../../users/user.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('should return true when username and password match', async () => {
      const user: LoginDTO = { username: 'testuser', password: 'testpass' };
      const hashedPassword = await bcrypt.hash('testpass', 10);
      const userDTO: UserDTO = {
        username: 'testuser',
        password: hashedPassword,
      };

      jest.spyOn(userService, 'findOne').mockResolvedValue(userDTO);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await authService.validateUser(user);
      expect(result).toBe(true);
      expect(userService.findOne).toHaveBeenCalledWith('testuser');
      expect(bcrypt.compare).toHaveBeenCalledWith('testpass', hashedPassword);
    });

    it('should return false when password does not match', async () => {
      const user: LoginDTO = { username: 'testuser', password: 'wrongpass' };
      const hashedPassword = await bcrypt.hash('testpass', 10);
      const userDTO: UserDTO = {
        username: 'testuser',
        password: hashedPassword,
      };

      jest.spyOn(userService, 'findOne').mockResolvedValue(userDTO);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const result = await authService.validateUser(user);
      expect(result).toBe(false);
      expect(userService.findOne).toHaveBeenCalledWith('testuser');
      expect(bcrypt.compare).toHaveBeenCalledWith('wrongpass', hashedPassword);
    });

    it('should throw an error if user is not found', async () => {
      const user: LoginDTO = { username: 'nonexistent', password: 'testpass' };

      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      await expect(authService.validateUser(user)).rejects.toThrow();
      expect(userService.findOne).toHaveBeenCalledWith('nonexistent');
    });
  });

  describe('login', () => {
    it('should return a JWT token when login is successful', async () => {
      const user: LoginDTO = { username: 'testuser', password: 'testpass' };
      const token = 'test.jwt.token';

      jest.spyOn(authService, 'validateUser').mockResolvedValue(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await authService.login(user);
      expect(result).toEqual({ access_token: token });
      expect(authService.validateUser).toHaveBeenCalledWith(user);
      expect(jwtService.sign).toHaveBeenCalledWith({ username: 'testuser' });
    });

    it('should throw an error if login fails', async () => {
      const user: LoginDTO = { username: 'testuser', password: 'wrongpass' };

      jest.spyOn(authService, 'validateUser').mockResolvedValue(false);

      await expect(authService.login(user)).rejects.toThrow('User not valid');
      expect(authService.validateUser).toHaveBeenCalledWith(user);
    });
  });
});
