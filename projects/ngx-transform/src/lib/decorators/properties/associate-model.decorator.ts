import { AbstractTransformProperty } from './abstract-property.decorator';
import { PropType } from '../../transform.interfaces';

export function AssociateModel(): any {
  return AbstractTransformProperty(PropType.model);
}
