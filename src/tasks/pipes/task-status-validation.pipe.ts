import { TaskStatus } from './../task.status.enum';
import { PipeTransform, BadRequestException } from "@nestjs/common";


export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]
    transform(value: string): string {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException();
        }
        return value;
    }

    private isStatusValid(status: any) {
        return this.allowedStatuses.indexOf(status) !== -1;

    }
}