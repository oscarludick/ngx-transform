import { IEvsParameterType } from './transform-entity.interface';
import { AbstractTransformParam } from './transform-entity-abstract.decorator';

export function EvsTarget(): ParameterDecorator {
  return AbstractTransformParam(IEvsParameterType.target);
}