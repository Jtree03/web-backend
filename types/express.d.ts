import { JWTPayloadDTO } from 'apps/auth/src/auth/dto/jwt.dto';
import { UserWithoutPassword } from 'apps/auth/src/users/models/user.schema';
import { Request } from 'express';

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      nickname: string;
      role: string;
    }

    interface Request {
      user?: User;
    }
  }
}
