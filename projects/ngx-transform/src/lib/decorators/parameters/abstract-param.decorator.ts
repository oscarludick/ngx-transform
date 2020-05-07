import { _Reflect, EntityParam } from '../../transform.symbols';
import { ParamType, ParamMeta } from '../../transform.interfaces';
import { ParamDecorator } from '../../decorators.model';

export function AbstractTransformParam(type: ParamType): ParamDecorator {
  return (target: Object, propertyKey: string | symbol, parameterIndex: number): void => {
    const parameters: Array<ParamMeta> = _Reflect.getOwnMetadata(EntityParam, target, propertyKey) || [];
    parameters.push({ index: parameterIndex, type: type });
    _Reflect.defineMetadata(EntityParam, parameters, target, propertyKey);
  };
}

