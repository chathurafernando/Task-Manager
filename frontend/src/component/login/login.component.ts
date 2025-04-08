import { Component } from '@angular/core';
import { AuthService } from '../../service/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Handle the login form submission
  onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and Password are required';
      return;
    }
  
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        this.authService.storeToken(response.token);  // Store the JWT token
        console.log('Login successful');
        console.log('JWT Token:', response.token);  // Log the token to the console
        this.router.navigate(['/tasks']);  // Redirect to task list after successful login
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = error.error.message || 'Login failed';
      }
    });
  }
}
