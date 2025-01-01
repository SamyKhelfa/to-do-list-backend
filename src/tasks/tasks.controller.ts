import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  NotFoundException,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Task } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Request() req,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.create(createTaskDto, req.user.id);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Request() req): Promise<Task[]> {
    return this.tasksService.findAll(req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    const task = await this.tasksService.findOne(id);
    if (!task) throw new NotFoundException(`Task #${id} not found`);
    return task;
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.tasksService.remove(id);
  }
}
