export type Constructor<T> = new (...args: any[]) => any;

export type ParamDecorator = (target: object, propertyKey: string | symbol, parameterIndex: number) => void;

export type FunctionDecorator<T> = (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<T>) => any;
