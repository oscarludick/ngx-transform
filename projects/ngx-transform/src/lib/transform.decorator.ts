import { TransformBase } from './transform.base';
import { Constructor } from './decorators.model';

/**
 * @param clazz the target class.
 *
 * #### Define the `@Transform` decorator
 * The target class must match with the class implementing the decorator.
 * ```ts
 * @Transform({target: EntityClass})
 * export class EntityClass {
 * }
 * ```
 */
export function Transform(clazz: { target: object }) {
  return <T extends Constructor<any>>(constructor: T) => {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        TransformBase.transform(clazz ? clazz.target : null, { ...args[0] });
      }
    };
  };
}
