import { IEvsParameterType } from './transform-entity.interface';
import { AbstractTransformParam } from './transform-entity-abstract.decorator';

export function EvsInstance(): ParameterDecorator {
  return AbstractTransformParam(IEvsParameterType.instance);
}