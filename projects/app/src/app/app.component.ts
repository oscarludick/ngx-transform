import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { UserResponse } from './entities/user-response.entity';

@Component({
  selector: 'app-root',
  template: `
    <div [style.flex-direction]="'row'" [style.display]="'flex'">
      <div [style.flex-direction]="'column'">
        <h4>JSON Response</h4>
        <pre>{{jsonResponse | json }}</pre>
      </div>
      <div [style.flex-direction]="'column'">
        <h4>Users Transform</h4>
        <pre>{{users | json }}</pre>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  jsonResponse: any[];
  users: any[];

  constructor(private userService: UserService) {
    this.init();
  }

  async init() {
    this.jsonResponse = await this.userService.query();
    this.users = this.jsonResponse.map((entity) => new UserResponse(entity).model);
  }
}
