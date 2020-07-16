import { IEvsParameterType } from './transform-entity.interface';
import { AbstractTransformParam } from './transform-entity-abstract.decorator';

export function EvsEntity(): ParameterDecorator {
  return AbstractTransformParam(IEvsParameterType.entity);
}
