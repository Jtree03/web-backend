import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { catchError, throwError } from 'rxjs';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error: any = exception.getError();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (error && Array.isArray(error.message)) {
      const errorMessages = error.message.flatMap(({ constraints }) =>
        Object.values(constraints),
      );
      error.message = errorMessages;
    }

    response.status(error?.statusCode || 500).json(error);
  }
}

export const CatchThrowRpcException = catchError((error) =>
  throwError(() => new RpcException(error.response)),
);
