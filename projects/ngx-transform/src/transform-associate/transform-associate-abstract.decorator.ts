import 'reflect-metadata'
import { IEvsPropertyType } from '../transform-entity';
import { IEvsAssociateModel, IEvsPropertyMeta } from '../transform.interface';
import { SEvsEntityProperty, SEvsPropertyTransform } from '../transform.symbol';

export function AbstractTransformProperty(type: IEvsPropertyType, associate?: IEvsAssociateModel): PropertyDecorator {
  return (target: any, property: string) => {
    const properties: Array<IEvsPropertyMeta> = Reflect.getOwnMetadata(SEvsEntityProperty, target.constructor, SEvsPropertyTransform) || [];
    properties.push({ property, target, associate, type });
    Reflect.defineMetadata(SEvsEntityProperty, properties, target.constructor, SEvsPropertyTransform);
  };
}