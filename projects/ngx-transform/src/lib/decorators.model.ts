export type Constructor<T> = { new(...args: any[]): any }

export interface ParamDecorator {
  (target: object, propertyKey: string | symbol, parameterIndex: number): void
}

export interface FunctionDecorator {
  (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>): any
}
