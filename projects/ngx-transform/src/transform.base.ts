import { EvsTransformEntity, EvsTarget, EvsInstance, EvsEntity } from './transform-entity';

export class TransformBase {
  @EvsTransformEntity()
  static transform(@EvsTarget() target: any, @EvsInstance() instance: any, @EvsEntity() entity: any): void { return; }
}