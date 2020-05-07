import { TransformBase } from './transform.base';
import { _Reflect } from './transform.symbols';
import { Constructor } from './decorators.model';

export function Transform(clazz: { target: Object }) {
  return function <T extends Constructor<any>>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        TransformBase.transform(clazz ? clazz.target : null, { ...args[0] });
      }
    }
  }
}