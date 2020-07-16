import { AbstractTransformProperty } from './transform-associate-abstract.decorator';
import { IEvsPropertyType } from '../transform-entity';

export function EvsAssociateModel(): PropertyDecorator {
  return AbstractTransformProperty(IEvsPropertyType.model);
}