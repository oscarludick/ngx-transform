import { PropertyMeta, PropType, AssociateModel } from '../../transform.interfaces';
import { reflect, PropTransform, EntityProperty } from '../../transform.symbols';

export function AbstractTransformProperty(type: PropType, associate?: AssociateModel): (target: object, property: string) => void {
  return (target: object, property: string) => {
    const properties: Array<PropertyMeta> = reflect.getOwnMetadata(EntityProperty, target.constructor, PropTransform) || [];
    properties.push({ property, target, associate, type });
    reflect.defineMetadata(EntityProperty, properties, target.constructor, PropTransform);
  };
}
