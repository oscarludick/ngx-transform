# ngx-transform

Transform data objects in Angular!

## Install

To use ngx-transform in your project install it via [npm](https://www.npmjs.com/package/@lugo/ngx-transform):

```
npm i ngx-transform --save
```

## Usage

Import the package in your entity class to use the decorators.

Check out the [demo](https://ngx-transform.stackblitz.io).

### Decorators

`@Transform()` use this decorator in your entity class, as param you must pass an object with the target class.

```typescript
import { Transform } from '@lugo/ngx-transform';

@Transform({ target: EntityClass })
export class EntityClass {}
```

`@AssociateModel()` associate a property with this decorator, this is where the result object will be stored.

```typescript
import { Transform, AssociateModel } from '@lugo/ngx-transform';

@Transform({ target: MyEntityClass })
export class EntityClass {
  @AssociateModel()
  model: any;
}
```

`@AssociateProperty()` associate the properties that you want to transform, specify from where you would get the property and where you 
want to place it.

```typescript
  {
    fromPath: string,
    toPath?: string
  }
```

```typescript
import { Transform, AssociateModel, AssociateProperty } from '@lugo/ngx-transform';

@Transform({ target: MyEntityClass })
export class EntityClass {
  @AssociateModel()
  model: any;
  @AssociateProperty({ fromPath: 'key1.key2.myproperty' })
  myproperty: string;
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
  *
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