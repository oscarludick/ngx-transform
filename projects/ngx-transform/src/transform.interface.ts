import { IEvsParameterType, IEvsPropertyType } from './transform-entity';

export interface IEvsAssociateModel {
  toPath?: string;
  fromPath: string;
}

export interface IEvsParameterMeta {
  index: number;
  type: IEvsParameterType;
}

export interface IEvsPropertyMeta {
  property: string;
  target: any;
  type: IEvsPropertyType;
  associate?: IEvsAssociateModel;
}