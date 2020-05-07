import { AbstractTransformParam } from './abstract-param.decorator';
import { ParamType } from '../../transform.interfaces';
import { ParamDecorator } from '../../decorators.model';

export function Entity(): ParamDecorator {
  return AbstractTransformParam(ParamType.entity);
}

