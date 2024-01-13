// REF: https://docs.nestjs.com/guards

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class EmployeesGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // here you can add some logic to authenticate the user;

        const ctx = context.switchToHttp()
        const req = ctx.getRequest<Request>()
        // return validateRequest(req);
        return true;
    }
}