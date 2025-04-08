import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  taskId: number | null = null;
  isEditMode: boolean = false; // Flag to check whether we're in edit mode
  statuses = ['TO_DO', 'IN_PROGRESS', 'DONE'];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      status: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Check if we're in edit mode by looking at the task ID in the route
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;  // Retrieve the task ID from the URL
      if (id) {
        this.taskId = id;
        this.isEditMode = true;  // Set to edit mode
        this.loadTask(id);  // Load the task data for editing
      }
    });
  }

  loadTask(id: number): void {
    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          status: task.status
        });
      },
      error: (err) => console.error('Error loading task:', err)
    });
  }

  get title() {
    return this.taskForm.get('title');
  }

  get description() {
    return this.taskForm.get('description');
  }

  get status() {
    return this.taskForm.get('status');
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const taskData: Task = this.taskForm.value;

    if (this.isEditMode && this.taskId) {
      // Update existing task if in edit mode
      this.taskService.updateTask(this.taskId, taskData).subscribe({
        next: () => {
          console.log('Task Updated');
          this.router.navigate(['/tasks']);  // Navigate back to the task list
        },
        error: (err) => console.error('Error updating task:', err)
      });
    } else {
      // Create a new task if not in edit mode
      this.taskService.createTask(taskData).subscribe({
        next: () => {
          console.log('Task Created');
          this.router.navigate(['/tasks']);  // Navigate back to the task list
        },
        error: (err) => console.error('Error creating task:', err)
      });
    }
  }
  goBack(): void {
    this.router.navigate(['/tasks']); // Navigate to the tasks page
  }
}
