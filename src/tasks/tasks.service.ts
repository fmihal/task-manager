import { User } from 'src/auth/user.entity';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUser } from 'src/auth/get-user.decorator';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) { }

    async getTasks(
        filterDto: GetTasksFilterDto,
        user: User
    ): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    async getTask(id: number, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });

        if (!found) {
            throw new NotFoundException(`Task with ${id} not found...`);
        }

        return found;
    }


    async createTask(
        createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteTask(id: number, user: User): Promise<void> {
        const result = await this.taskRepository.delete({ id, userId: user.id });

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ${id} not found...`);
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTask(id, user);
        task.status = status;
        await task.save();
        return task;
    }
}
