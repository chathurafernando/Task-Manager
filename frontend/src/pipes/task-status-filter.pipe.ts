import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';

@Pipe({
  name: 'taskStatusFilter',
  standalone: true
})
export class TaskStatusFilterPipe implements PipeTransform {
  transform(tasks: Task[], status: string): Task[] {
    if (!status) return tasks;
    return tasks.filter(task => task.status.toLowerCase() === status.toLowerCase());
  }
}
