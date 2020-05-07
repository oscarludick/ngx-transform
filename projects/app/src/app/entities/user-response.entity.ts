import { Transform, AssociateProperty, AssociateModel } from '@lugo/ngx-transform';

@Transform({ target: UserResponse })
export class UserResponse {
  @AssociateModel()
  model: any;
  @AssociateProperty({ toPath: '__hidden__', fromPath: 'id' })
  id: number;
  @AssociateProperty({ fromPath: 'name' })
  name: string;
  @AssociateProperty({ fromPath: 'username' })
  username: string;
  @AssociateProperty({ fromPath: 'email' })
  email: string;
  @AssociateProperty({ fromPath: 'address.street' })
  street: string;
  @AssociateProperty({ fromPath: 'address.suite' })
  suite: string;
  @AssociateProperty({ fromPath: 'address.city' })
  city: string;
  @AssociateProperty({ fromPath: 'address.zipcode' })
  zipcode: string;
  @AssociateProperty({ fromPath: 'address.geo.lat' })
  lat: string;
  @AssociateProperty({ fromPath: 'address.geo.lng' })
  lng: string;
  @AssociateProperty({ fromPath: 'phone' })
  phone: string;
  @AssociateProperty({ fromPath: 'company.name' })
  companyName: string;
  @AssociateProperty({ fromPath: 'company.catchPhrase' })
  companyCatchPhrase: string;

  constructor(entity: any) {
  }
}