import { AbstractTransformProperty } from './abstract-property.decorator';
import { PropType } from '../../transform.interfaces';

/**
 * The `@AssociateModel`stores the object transformed once the class has been instancied.
 * Access:
 * ```ts
 * const model = new MyEntityClass({key: 'value'}).model;
 * console.log(model.myNewKey);
 * ```
 * #### Define the `@AssociateModel` decorator
 * The key associated with the decorator will contain the new object.
 * ```ts
 * @Transform({target: EntityClass})
 * export class EntityClass {
 *  @AssociateModel()
 *  model: any;
 * }
 * ```
 */
export function AssociateModel(): (target: object, property: string) => void {
  return AbstractTransformProperty(PropType.model);
}
