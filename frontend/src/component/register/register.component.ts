import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  private authService = inject(AuthService);  // Injecting AuthService
  private router = inject(Router);            // Injecting Router

  // Handle the register form submission
  onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and Password are required';
      return;
    }
  
    console.log('Registering with:', { username: this.username, password: this.password });
  
    this.authService.register(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        console.error('Full error response:', error.error);
        this.errorMessage = error.error?.message || 'Registration failed';
      }
    });
  }
  
}
