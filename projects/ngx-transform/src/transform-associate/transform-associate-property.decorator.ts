
import { IEvsPropertyType } from '../transform-entity';
import { IEvsAssociateModel } from '../transform.interface';
import { AbstractTransformProperty } from './transform-associate-abstract.decorator';

export function EvsAssociateProperty(associate: IEvsAssociateModel): PropertyDecorator {
  return AbstractTransformProperty(IEvsPropertyType.association, associate);
}