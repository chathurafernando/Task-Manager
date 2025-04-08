// src/app/models/task.model.ts
export enum TaskStatus {
    TO_DO = 'TO_DO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
  }
  
  export interface Task {
    id?: number;
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt?: Date;
    updatedAt?: Date;
  }