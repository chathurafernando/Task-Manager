import { Routes } from '@angular/router';
import { TaskFormComponent } from '../component/task-form/task-form.component';
import { TaskListComponent } from '../component/task-list/task-list.component';
import { RegisterComponent } from '../component/register/register.component';
import { LoginComponent } from '../component/login/login.component';
import { AuthguardService } from '../service/authguard.service';
import { TaskDetailsComponent } from '../component/task-details/task-details.component';



export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' }, // Redirect to task list by default
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'task-form', component: TaskFormComponent , canActivate: [AuthguardService] }, // For creating new task
  { path: 'task-form/:id', component: TaskFormComponent , canActivate: [AuthguardService] }, // For editing task by id
  { path: 'task-details/:id', component: TaskDetailsComponent,canActivate: [AuthguardService]
  },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthguardService] }, // Protect this route
];