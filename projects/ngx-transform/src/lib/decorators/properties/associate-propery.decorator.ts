import { AssociateModel, PropType } from '../../transform.interfaces';
import { AbstractTransformProperty } from './abstract-property.decorator';

/**
 * @param associate implements :
 * {
 *  fromPath: string,
 *  toPath?: string
 * }
 * The `@AssociateProperty` decorator must be implemented in
 * the properties where the result value will be stored.
 * For example the next object will be transformed:
 * ```json
 * {
 *  "key1": {
 *    "key2": {
 *      "prop": "value"
 *     }
 *   }
 * }
 * ```
 * #### The key associated with the decorator will contain the new object.
 * ```ts
 * @Transform({target: EntityClass})
 * export class EntityClass {
 *  @AssociateModel()
 *  model: any;
 *  @AssociateProperty({fromPath: 'key1.key2.prop', toPath: 'newKey'})
 *  myProp: any;
 * }
 * ```
 * The result will be:
 * ```json
 * {
 *  "newKey": {
 *    "myProp": 'value'
 *  }
 * }
 * ```
 */
export function AssociateProperty(associate: AssociateModel): (target: object, property: string) => void {
  return AbstractTransformProperty(PropType.association, associate);
}
