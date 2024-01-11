
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Body() employeeData): Promise<any> {
    const employee = await this.employeeService.create(employeeData);
    return { success: true, data: employee };
  }

  @Get()
  async findAll(): Promise<any> {
    const employees = await this.employeeService.findAll();
    return { success: true, data: employees };
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<any> {
    const employee = await this.employeeService.findById(id);
    return { success: true, data: employee };
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<any> {
    const employee = await this.employeeService.findByEmail(email);
    return { success: true, data: employee };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatedEmployeeData): Promise<any> {
    const updatedEmployee = await this.employeeService.update(id, updatedEmployeeData);
    return { success: true, data: updatedEmployee };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    await this.employeeService.delete(id);
    return { success: true, message: 'Employee deleted successfully' };
  }
}
