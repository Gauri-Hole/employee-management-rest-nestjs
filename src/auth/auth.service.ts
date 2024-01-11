
// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Employee } from '../employee/employee.model';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: any): Promise<Employee> {
    return this.employeeService.findByEmail(payload.email);
  }

  async login(employee: Employee): Promise<any> {
    const payload = { email: employee.email, sub: employee._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
