import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(): Task[] {
        return this.tasksService.getTasks();
    }

    @Get('/:id')
    getTask(@Param('id') id: string): Task {
        return this.tasksService.getTask(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Task[] {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    upadateTaskStatus(
        @Param('id') id: string,
        @Param('status') status: TaskStatus,
    ): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
