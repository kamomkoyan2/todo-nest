import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private model: Model<TodoDocument>) {}
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    console.log(createTodoDto)
    return await new this.model({
      ...createTodoDto,
      createdAt: new Date(),
    }).save();
  }

  async findAll(): Promise<Todo[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Todo> {
    return await this.model.findById(id).exec();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return await this.model.findByIdAndUpdate(id, updateTodoDto).exec();
  }

  async remove(id: string) {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
