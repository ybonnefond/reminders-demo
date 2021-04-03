import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

interface BadRequestExceptionResponse {
  message: string[];
}

@Catch(BadRequestException)
export class BadRequestExceptionFilter extends BaseWsExceptionFilter {
  public catch(exception: BadRequestException, host: ArgumentsHost) {
    const invalidFields = (exception.getResponse() as BadRequestExceptionResponse)
      .message;
    const properException = new WsException({
      status: 'error',
      message: 'Bad request',
      fields: invalidFields,
    });
    super.catch(properException, host);
  }
}
