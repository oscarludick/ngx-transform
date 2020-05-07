export interface AssociateModel {
  toPath?: string,
  fromPath: string
}

export enum ParamType {
  entity = 'entity',
  result = 'result',
  target = 'target'
}

export enum PropType {
  association = 'association',
  model = 'model'
}

export interface ParamMeta {
  index: number,
  type: ParamType
}

export interface PropertyMeta {
  property: string,
  target: any,
  type: PropType,
  associate?: AssociateModel
}