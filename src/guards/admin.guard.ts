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
      throw new NotFoundException('no user found');
    }
    if (request.currentUser.role == 'admin') {
      return true;
    } else {
      throw new UnauthorizedException(
        `${request.currentUser.role} Not Authorized`,
      );
    }
  }
}
