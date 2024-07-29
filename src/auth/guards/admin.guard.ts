import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
    // constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const user = request.user; // User should be attached by the authentication guard
  
      if (!user || user.type !== 'admin') { // Adjust this condition based on how roles are managed
        throw new ForbiddenException('You do not have admin privileges');
      }
  
      return true;
    }
  }
