import 'reflect-metadata'

import { SEvsEntityParam, SEvsEntityProperty } from '../transform.symbol';
import { IEvsParameterMeta, IEvsPropertyMeta, } from '../transform.interface';
import { IEvsParameterType, IEvsPropertyType } from './transform-entity.interface';

interface wrappedFunctionModel {
  (target: any, entity: any): any
}

export function EvsTransformEntity(): MethodDecorator {
  return (
    target: object,
    propertyName: string | symbol,
    descriptor: TypedPropertyDescriptor<any>): any => {
    const wrappedFunction: wrappedFunctionModel = descriptor.value;
    function descriptorFunction() {
      const parameters: Array<IEvsParameterMeta> = validateParameters(target, propertyName);
      const paramEntity: IEvsParameterMeta = parameters.find((param: IEvsParameterMeta) => param.type === IEvsParameterType.entity);
      const paramTarget: IEvsParameterMeta = parameters.find((param: IEvsParameterMeta) => param.type === IEvsParameterType.target);
      const paramInstance: IEvsParameterMeta = parameters.find((param: IEvsParameterMeta) => param.type === IEvsParameterType.instance);

      const clazzTarget: any = valiadateParamTarget(paramTarget, arguments);
      const instance: object = arguments[paramInstance.index];
      const entity: object = validateParamEntity(paramEntity, arguments);

      const properties: Array<IEvsPropertyMeta> = validateProperties(clazzTarget, propertyName);
      const modelProperty = validateModel(properties, clazzTarget);
      const newArgs: any[] = [];

      newArgs[paramTarget.index] = clazzTarget;
      newArgs[paramEntity.index] = entity;
      defineGetProperty(instance, modelProperty.property, transformObject(entity, properties, instance));
      return wrappedFunction.apply(this, newArgs);
    }
    descriptor.value = descriptorFunction;
  };
}

function validateModel(properties: Array<IEvsPropertyMeta>, target: any): IEvsPropertyMeta {
  const modelIndex = properties.findIndex((prop) => prop.type === IEvsPropertyType.model);
  if (modelIndex >= 0) {
    const modelProp = properties[modelIndex];
    return modelProp;
  } else {
    throw Error(`@EvsAssociateModel() is not present in ${target.name}, associate one property with this decorator.`);
  }
}

function validateProperties(target: any, propertyName: string | symbol): Array<any> {
  const properties: Array<any> = Reflect.getOwnMetadata(SEvsEntityProperty, target, propertyName);
  if (properties && properties.length > 0) {
    return properties;
  } else {
    throw Error(`@EvsAssociate() is not present in ${target.name}, associate at least one property with this decorator.`);
  }
}

function valiadateParamTarget(paramTarget: IEvsParameterMeta, args: any): any {
  const target: object = args[paramTarget.index];
  if (target) {
    return target;
  } else {
    throw Error('Can´t resolve target, please define a target with @EvsTransform().');
  }
}

function validateParamEntity(paramEntity: IEvsParameterMeta, args: any): object {
  const entity: object = args[paramEntity.index];
  if (entity && Reflect.ownKeys(entity).length > 0) {
    return entity;
  } else {
    throw Error('Can´t transform entity, object is empty or undefined.');
  }
}

function validateParameters(target: object, propertyName: string | symbol): any[] {
  const parameters: any[] = Reflect.getOwnMetadata(SEvsEntityParam, target, propertyName);
  if (parameters && parameters.length > 0) {
    return parameters;
  } else {
    throw Error('Something wrong happend.');
  }
}


function transformObject(entity: object, properties: Array<IEvsPropertyMeta>, instance: any): object {
  const associationProperties: Array<IEvsPropertyMeta> = properties.filter((prop) => prop.type === IEvsPropertyType.association);
  const object: object = Object.create(null, {});
  for (const property of associationProperties) {
    const path = ''.concat(property.associate.toPath);
    const keys: Array<string> = path.split('.').filter((key) => key.trim().length > 0 && key !== 'undefined');
    buildObject(object, keys, property, entity, instance);
  }
  return object;
}

function buildObject(objectBuild: object, keys: Array<string>, propertyMeta: IEvsPropertyMeta, entity: object, instance: any): void {
  const key = keys.splice(0, 1)[0];
  if (!objectBuild[key] && key) {
    objectBuild[key] = Object.create(null, {});
  }
  if (keys.length > 0) {
    buildObject(objectBuild[key], keys, propertyMeta, entity, instance);
  } else {
    associateValue(propertyMeta, entity, key, objectBuild, instance);
  }
}

function associateValue(propertyMeta: IEvsPropertyMeta, entity: object, key: string, object: object, instance: any) {
  const associateProperty: string = propertyMeta.associate.fromPath;
  const entityValue = associateProperty.split('.')
    .reduce((current: object, propertyKey: string) => findEntityValue(entity)(current, propertyKey), null);
  if (key) {
    object[key][propertyMeta.property] = entityValue;
  } else {
    object[propertyMeta.property] = entityValue;
  }
  defineGetProperty(instance, propertyMeta.property, entityValue);
}

function findEntityValue(entity: object): (current: object, propertyKey: string) => object {
  return (current: object, propertyKey: string) => {
    current = current ? current[propertyKey] : entity[propertyKey];
    return current;
  };
}

function defineGetProperty(target: any, key: string, value: any): void {
  Object.defineProperties(target, {
    [key]: {
      get() {
        return value;
      },
      enumerable: true,
      configurable: true
    }
  });
}