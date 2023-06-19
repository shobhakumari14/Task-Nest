import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { plainToClass, } from 'class-transformer';

interface ClassConstructor {
    new(...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
    
    return UseInterceptors(new SerializeInterceptor(dto));
}


export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) { }

    intercept(context: ExecutionContext, handler: CallHandler) {
        // Running something before request is handled by the req. handler
        const controllerName = context.getClass().name;
        const routeName = context.getHandler().name;
        console.log(`${controllerName} passing through intercepter`);
        console.log(`${routeName} route executed`);


        return handler.handle().pipe(
            map((data: any) => {
                //Run Something Before the response is sent out
                if (data.role === 'admin') {
                    return data;
                }
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                })

            }),

        );
    }
}