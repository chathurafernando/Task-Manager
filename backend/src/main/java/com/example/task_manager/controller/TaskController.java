package com.example.task_manager.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.task_manager.model.Task;
import com.example.task_manager.service.TaskService;

@CrossOrigin(origins = "http://localhost:4200") 

@RestController
@RequestMapping("/api/tasks")  // Base URL for task-related operations

public class TaskController {
    @Autowired
        private TaskService taskService;


        @GetMapping
        public List<Task> getAllTasks() {
            return taskService.getAllTasks();
        }
    
        @GetMapping("/{id}")
        public Task getTaskById(@PathVariable Long id) {
            return taskService.getTaskById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        }
    
        @PostMapping
        public Task createTask(@RequestBody Task task) {
            return taskService.createTask(task);
        }
    
        @PutMapping("/{id}")
        public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
            return taskService.updateTask(id, taskDetails);
        }
    
        @DeleteMapping("/{id}")
        public void deleteTask(@PathVariable Long id) {
            taskService.deleteTask(id);
        }
    }