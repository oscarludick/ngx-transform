import { AbstractTransformParam } from './abstract-param.decorator';;
import { ParamType } from '../../transform.interfaces';
import { ParamDecorator } from '../../decorators.model';

export function Target(): ParamDecorator {
  return AbstractTransformParam(ParamType.target);
}