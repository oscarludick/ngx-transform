import { _Reflect, EntityParam, EntityProperty } from '../../transform.symbols';
import { ParamMeta, ParamType, PropertyMeta, PropType } from '../../transform.interfaces';
import { FunctionDecorator } from '../../decorators.model';

export function TransformEntity(): FunctionDecorator {
  return function (target: Object, propertyName: string, descriptor: TypedPropertyDescriptor<Function>): any {
    const wrappedFunction: Function = descriptor.value;
    descriptor.value = function (): any {
      const parameters: Array<ParamMeta> = validateParameters(target, propertyName);
      const paramEntity: ParamMeta = parameters.find((param: ParamMeta) => param.type === ParamType.entity);
      const paramTarget: ParamMeta = parameters.find((param: ParamMeta) => param.type === ParamType.target);

      const clazzTarget: any = valiadateParamTarget(paramTarget, arguments);
      const entity: Object = validateParamEntity(paramEntity, arguments);

      const properties: Array<PropertyMeta> = validateProperties(clazzTarget, propertyName);
      const modelProperty = validateModel(properties, clazzTarget);

      let newArgs: any[] = [];
      newArgs[paramTarget.index] = clazzTarget;
      newArgs[paramEntity.index] = entity;
      defineGetProperty(modelProperty.target, modelProperty.property, transformObject(entity, properties));
      return wrappedFunction.apply(this, newArgs);
    }
  }
}

function validateModel(properties: Array<PropertyMeta>, target: any): PropertyMeta {
  const modelIndex = properties.findIndex((prop) => prop.type === PropType.model);
  if (modelIndex >= 0) {
    const modelProp = properties[modelIndex];
    return modelProp;
  } else {
    throw Error(`@AssociateModel() is not present in ${target.name}, associate one property with this decorator.`)
  }
}

function validateProperties(target: any, propertyName: string): Array<any> {
  const properties: Array<any> = _Reflect.getOwnMetadata(EntityProperty, target, propertyName);
  if (properties && properties.length > 0) {
    return properties;
  } else {
    throw Error(`@Associate() is not present in ${target.name}, associate at least one property with this decorator.`)
  }
}

function valiadateParamTarget(paramTarget: ParamMeta, args: any): any {
  const target: Object = args[paramTarget.index];
  if (target) {
    return target;
  } else {
    throw Error('Can´t resolve target, please define a target with @Transform({target: TargetClass}).');
  }
}

function validateParamEntity(paramEntity: ParamMeta, args: any): Object {
  const entity: Object = args[paramEntity.index];
  if (entity && _Reflect.ownKeys(entity).length > 0) {
    return entity;
  } else {
    throw Error('Can´t transform entity, object is empty or undefined.');
  }
}

function validateParameters(target: Object, propertyName: string): any[] {
  const parameters: any[] = _Reflect.getOwnMetadata(EntityParam, target, propertyName);
  if (parameters && parameters.length > 0) {
    return parameters;
  } else {
    throw Error('Something wrong happend.')
  }
}


function transformObject(entity: Object, properties: Array<PropertyMeta>): Object {
  const associationProperties: Array<PropertyMeta> = properties.filter((prop) => prop.type === PropType.association);
  let object: Object = Object.create(null, {});
  for (let property of associationProperties) {
    const path = "".concat(property.associate.toPath);
    const keys: Array<string> = path.split('.').filter((key) => key.trim().length > 0 && key !== 'undefined');
    buildObject(object, keys, property, entity)
  }
  return object;
}

function buildObject(objectBuild: Object, keys: Array<string>, propertyMeta: PropertyMeta, entity: Object): void {
  const key = keys.splice(0, 1)[0];
  if (!objectBuild[key] && key) {
    objectBuild[key] = Object.create(null, {});
  }
  if (keys.length > 0) {
    buildObject(objectBuild[key], keys, propertyMeta, entity);
  } else {
    associateValue(propertyMeta, entity, key, objectBuild);
  }
}

function associateValue(propertyMeta: PropertyMeta, entity: Object, key: string, object: Object) {
  const associateProperty: string = propertyMeta.associate.fromPath;
  const entityValue = associateProperty.split('.').reduce((current: Object, propertyKey: string) => findEntityValue(entity)(current, propertyKey), null);
  if (key) {
    object[key][propertyMeta.property] = entityValue;
  } else {
    object[propertyMeta.property] = entityValue;
  }
  defineGetProperty(propertyMeta.target, propertyMeta.property, entityValue);
}

function findEntityValue(entity: Object): Function {
  return (current: Object, propertyKey: string) => {
    current = current ? current[propertyKey] : entity[propertyKey];
    return current;
  }
}

function defineGetProperty(target: any, key: string, value: any) {
  Object.defineProperty(target, key, {
    get() {
      return value;
    },
    enumerable: true,
    configurable: false
  });
}
