import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { Task } from '../../models/task';
import { Router } from '@angular/router';  // Import the Router service
import { FormsModule } from '@angular/forms';
import { TaskStatusFilterPipe } from '../../pipes/task-status-filter.pipe';



@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,TaskStatusFilterPipe], //  Add FormsModule here
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = true;
  statusFilter: string = ''; //  Filter variable

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
        this.loading = false;
      }
    });
  }

  filteredTasks(): Task[] {
    if (!this.statusFilter) return this.tasks;
    return this.tasks.filter(
      task => task.status.toLowerCase() === this.statusFilter.toLowerCase()
    );
  }
  

  editTask(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/task-form', id]);
    }
  }

  viewTask(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/task-details', id]);
    }
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      });
    }
  }
  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.clear(); // Clears all localStorage
      this.router.navigate(['/login']);
    }
  }
  
}