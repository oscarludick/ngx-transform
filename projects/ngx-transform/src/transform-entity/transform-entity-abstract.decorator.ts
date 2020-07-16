import 'reflect-metadata'

import { SEvsEntityParam } from '../transform.symbol';
import { IEvsParameterMeta } from '../transform.interface';
import { IEvsParameterType } from './transform-entity.interface';

export function AbstractTransformParam(type: IEvsParameterType): ParameterDecorator {
  return (target: object, propertyKey: string | symbol, parameterIndex: number): void => {
    const parameters: Array<IEvsParameterMeta> = Reflect.getOwnMetadata(SEvsEntityParam, target, propertyKey) || [];
    parameters.push({ index: parameterIndex, type });
    Reflect.defineMetadata(SEvsEntityParam, parameters, target, propertyKey);
  };
}