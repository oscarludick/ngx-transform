import { TransformEntity, Target, Entity } from './decorators';

export class TransformBase {
  @TransformEntity()
  static transform(@Target() target: any, @Entity() entity: any): void { return; }
}