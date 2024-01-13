import { Catch, ArgumentsHost, HttpStatus, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";
import { LoggerService } from "./logger/logger.service";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

type ErrorResponse = {
    statusCode: number,
    timeStamp: string,
    path: string,
    message: string | object,
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new LoggerService();

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        const errResponse: ErrorResponse = {
            statusCode: 500,
            timeStamp: new Date().toISOString(),
            path: request.url,
            message: '',
        }

        if (exception instanceof HttpException) {
            errResponse.statusCode = exception.getStatus()
            errResponse.message = exception.getResponse();
        } else if (exception instanceof PrismaClientValidationError) {
            errResponse.statusCode = 422,
                errResponse.message = exception.message.replaceAll('\n', '')
        } else {
            errResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            errResponse.message = 'Internal server error'
        }

        response.status(errResponse.statusCode).json(errResponse);

        this.logger.error(errResponse.message, AllExceptionsFilter.name);

        super.catch(exception, host)

    }


}