import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class UnifyResponse<T> {
  readonly code: number;
  readonly message: string;
  readonly data: T;

  private constructor(code: number, message: string, data: T) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  // 成功响应（带数据）
  static success<T>(data: T, message = 'success'): UnifyResponse<T> {
    return new UnifyResponse<T>(200, message, data);
  }

  // 成功响应（无数据
  static ok(message = 'message'): UnifyResponse<string> {
    return new UnifyResponse<string>(200, message, '');
  }

  // 错误响应
  static error(message: string, code = 500): UnifyResponse<null> {
    return new UnifyResponse(code, message, null);
  }
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, UnifyResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<UnifyResponse<T>> | Promise<Observable<UnifyResponse<T>>> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof UnifyResponse) {
          return data;
        }
        return UnifyResponse.success(data);
      }),
    );
  }
}
