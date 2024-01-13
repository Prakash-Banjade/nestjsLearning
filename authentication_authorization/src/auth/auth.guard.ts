import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

export class AuthGuard implements CanActivate {

    constructor(private readonly jwtService: JwtService, private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        // const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        //     context.getHandler(),
        //     context.getClass(),
        // ]);
        // if (isPublic) {
        //     // 💡 See this condition
        //     return true;
        // }

        const req = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(req);

        console.log(token)

        if (!token) throw new UnauthorizedException();

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: 'mysecret',
                }
            )

            req.user = payload;
        } catch (e) {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(req: Request): string | undefined {
        const [type, token] = req.headers?.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
} 