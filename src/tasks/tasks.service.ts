import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    return this.prisma.task.create({
      data: {
        content: createTaskDto.content,
        userId,
      },
      include: { user: true },
    });
  }

  async findAll(userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { userId },
      include: { user: true },
    });
  }

  async findOne(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) throw new NotFoundException(`Task #${id} not found`);

    return this.prisma.task.update({
      where: { id },
      data: { content: updateTaskDto.content },
      include: { user: true },
    });
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    if (!task) throw new NotFoundException(`Task #${id} not found`);

    await this.prisma.task.delete({ where: { id } });
  }
}
