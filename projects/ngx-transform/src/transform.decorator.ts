import { TransformBase } from './transform.base';

export function EvsTransform() {
  return <T extends { new(...args: any[]): any }>(baseConstructor: T) => {
    return class extends baseConstructor {
      constructor(...args: any[]) {
        super(...args);
        TransformBase.transform(baseConstructor, this, { ...args[0] });
      }
    };
  };
}