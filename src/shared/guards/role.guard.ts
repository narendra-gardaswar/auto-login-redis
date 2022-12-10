// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { UserRoles } from '../../users/users.model';
// import { AuthService } from '../auth/auth.service';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     private readonly authService: AuthService,
//   ) {}
//   canActivate(context: ExecutionContext): boolean {
//     return this.validateRESTRequest(context);
//   }

//   private validateRESTRequest(context: ExecutionContext): boolean {
//     const roles = this.reflector.get<UserRoles[]>(
//       'roles',
//       context.getHandler(),
//     );
//     if (!roles) return true;
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;
//     return this.authService.validateRoles(user, roles);
//   }
// }
