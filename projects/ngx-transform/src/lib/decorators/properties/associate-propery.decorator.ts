import { AssociateModel, PropType } from '../../transform.interfaces';
import { AbstractTransformProperty } from './abstract-property.decorator';

export function AssociateProperty(associate: AssociateModel): any {
  return AbstractTransformProperty(PropType.association, associate);
}