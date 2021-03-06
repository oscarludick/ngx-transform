# ngx-transform

Transform data objects in Angular!

## Install

To use ngx-transform in your project install it via [npm](https://www.npmjs.com/package/ngx-transform):

```
npm i ngx-transform --save
```

## Usage

Import the package in your entity class to use the decorators.

Check out the [demo](https://stackblitz.com/edit/ngx-transform).

### Decorators

`@EvsTransform()` use this decorator in your entity class.

```typescript
import { EvsTransform } from 'ngx-transform';

@EvsTransform()
export class EntityClass {}
```

`@AssociateModel()` associate a property with this decorator, this is where the result object will be stored.

```typescript
import { EvsTransform, EvsAssociateModel } from 'ngx-transform';

@EvsTransform()
export class EntityClass {
  @EvsAssociateModel()
  model: any;
}
```

`@EvsAssociateProperty()` associate the properties that you want to transform, specify from where you would get the property and where you
want to place it, the variable names is the property key where the value will be stored.

```typescript
  {
    fromPath: string,
    toPath?: string
  }
```

```typescript
import { EvsTransform, EvsAssociateModel, EvsAssociateProperty } from 'ngx-transform';

@EvsTransform()
export class EntityClass {
  @EvsAssociateModel()
  model: any;
  /**
   * From this: {"key1":{"key2":{"oldProperty": "value"}}}
   * To this: {"newProperty":"value"}
   * */
  @EvsAssociateProperty({ fromPath: 'key1.key2.oldProperty' })
  newProperty: string;
}
```

## Example

This is an example using [jsonplaceholder](https://jsonplaceholder.typicode.com/).

If we fecth the next url https://jsonplaceholder.typicode.com/users, we will get this array object:

```json
  [{
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }]
```

We define our entity class of users and associate the paths we want to transform.

```typescript
import { EvsTransform, EvsAssociateProperty, EvsAssociateModel } from 'ngx-transform';

@EvsTransform()
export class UserResponse {
  @EvsAssociateModel()
  model: any;
  @EvsAssociateProperty({ toPath: '__hidden__', fromPath: 'id' })
  id: number;
  @EvsAssociateProperty({ fromPath: 'name' })
  name: string;
  @EvsAssociateProperty({ fromPath: 'username' })
  username: string;
  @EvsAssociateProperty({ fromPath: 'email' })
  email: string;
  @EvsAssociateProperty({ fromPath: 'address.street' })
  street: string;
  @EvsAssociateProperty({ fromPath: 'address.suite' })
  suite: string;
  @EvsAssociateProperty({ fromPath: 'address.city' })
  city: string;
  @EvsAssociateProperty({ fromPath: 'address.zipcode' })
  zipcode: string;
  @EvsAssociateProperty({ fromPath: 'address.geo.lat' })
  lat: string;
  @EvsAssociateProperty({ fromPath: 'address.geo.lng' })
  lng: string;
  @EvsAssociateProperty({ fromPath: 'phone' })
  phone: string;
  @EvsAssociateProperty({ fromPath: 'company.name' })
  companyName: string;
  @EvsAssociateProperty({ fromPath: 'company.catchPhrase' })
  companyCatchPhrase: string;

  constructor(entity: any) {
  }
}
```

Define a service to fetch the data and transform it.
```typescript
import { Injectable } from '@angular/core';
import { UserResponse } from './entities/user-response.entity';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor() {
    this.query();
  }

  /*
  * Inject the service in any component
  * Fetch users data and cast to UserResponse.
  */
  query(): void {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response: {json: any[]}) => response.json())
      .then((json: any[]) => {
        console.table(json);
        const users: any[] = json.map((entity: any) => new UserResponse(entity).model);
        console.table(users);
      });
  }
}
```