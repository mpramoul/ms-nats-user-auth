// common/jwt.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const rpcContext = context.switchToRpc();
    const data = rpcContext.getData();
    const token = data?._token;
    if (!token) {
      throw new RpcException(
          {
              statusCode:403,
              message:'Token no proporcionado F1',
              errors:[],
          }
      );
    }

    try {

      const decoded = this.jwtService.verify(token);
      data.user = decoded; // Añade el usuario decodificado al payload
      return next.handle();
    } catch (error) {
        throw new RpcException(
            {
                statusCode:403,
                message:'Token inválido',
                errors:[],
            }
        );
    }
  }
}