import { Component, inject } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../service/task.service';


@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})

   

export class TaskDetailsComponent {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  private router = inject(Router); 
  task: any;

  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
  
    this.taskService.getTaskById(taskId).subscribe({
      next: (data) => {
        this.task = data;
      },
      error: (error) => {
        console.error('Error fetching task details:', error);
      }
    });
  }
  
  goBack(): void {
    this.router.navigate(['/tasks']);
  }
}
