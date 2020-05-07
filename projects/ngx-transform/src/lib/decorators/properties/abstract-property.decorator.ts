import { PropertyMeta, PropType, AssociateModel } from '../../transform.interfaces';
import { _Reflect, PropTransform, EntityProperty } from '../../transform.symbols';

export function AbstractTransformProperty(type: PropType, associate?: AssociateModel) {
  return function (target: Object, property: string) {
    const properties: Array<PropertyMeta> = _Reflect.getOwnMetadata(EntityProperty, target.constructor, PropTransform) || [];
    properties.push({ property, target, associate, type });
    _Reflect.defineMetadata(EntityProperty, properties, target.constructor, PropTransform);
  }
}