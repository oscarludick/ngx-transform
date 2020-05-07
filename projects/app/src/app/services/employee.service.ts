import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  public async query(): Promise<any> {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json());
  }
}