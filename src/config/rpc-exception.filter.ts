import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class RpcValidationFilter implements RpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    // Manejo genérico para otros errores
    return throwError(() => ({
      status: 'error',
      message: exception.message || 'Internal server error',
      errors: exception.error.errors ?? [],
      timestamp: new Date().toISOString(),
    }));
  }
}