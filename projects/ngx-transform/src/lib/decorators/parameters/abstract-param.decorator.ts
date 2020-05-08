import { reflect, EntityParam } from '../../transform.symbols';
import { ParamType, ParamMeta } from '../../transform.interfaces';
import { ParamDecorator } from '../../decorators.model';

export function AbstractTransformParam(type: ParamType): ParamDecorator {
  return (target: object, propertyKey: string | symbol, parameterIndex: number): void => {
    const parameters: Array<ParamMeta> = reflect.getOwnMetadata(EntityParam, target, propertyKey) || [];
    parameters.push({ index: parameterIndex, type });
    reflect.defineMetadata(EntityParam, parameters, target, propertyKey);
  };
}
