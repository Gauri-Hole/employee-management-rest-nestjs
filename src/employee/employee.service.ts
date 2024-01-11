
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
  ) {}

  async create(employeeData): Promise<Employee> {
    const employee = new this.employeeModel(employeeData);
    return employee.save();
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async findById(id: string): Promise<Employee | null> {
    return this.employeeModel.findById(id).exec();
  }

  async update(id: string, updatedEmployeeData): Promise<Employee> {
    const updatedEmployee = await this.employeeModel
      .findByIdAndUpdate(id, updatedEmployeeData, { new: true })
      .exec();

    if (!updatedEmployee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }

    return updatedEmployee;
  }

  async delete(id: string): Promise<void> {
    const result = await this.employeeModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
  }

  async findByEmail(email: string): Promise<Employee | null> {
    return this.employeeModel.findOne({ email }).exec();
  }
}
