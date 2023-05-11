import {
    createParamDecorator,
    ExecutionContext,
} from '@nestjs/common';

export const CurrentController = createParamDecorator(
    (data: any, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        const [handler, controller] = request.url.split("/");
      return `Current Controller ${controller}`;
    }
)


