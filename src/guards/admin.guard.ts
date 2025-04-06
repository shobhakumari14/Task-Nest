import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.currentUser) {
      throw new NotFoundException('USER NOT FOUND');
    }
    if (request.currentUser.role === 2) {
      return true;
    } else {
      throw new UnauthorizedException(
        `${request.currentUser.role} UNAUTHORIZED`,
      );
    }
  }
}
