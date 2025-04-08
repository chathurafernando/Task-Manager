import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../service/auth-service.service';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
   
  ],
  template: `<router-outlet></router-outlet>`,
  providers: [TaskService, AuthService]
})
export class AppComponent {}