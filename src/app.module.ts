import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeService } from './employee/employee.service';
import { EmployeeModule } from './employee/employee.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from './employee/employee.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ 
    // MongooseModule.forRoot(process.env.MONGODB_URI), 
    MongooseModule.forRoot('mongodb://localhost:27017/employee-management'),
    MongooseModule.forFeature([{ name: 'Employee', schema: EmployeeSchema }]),
    EmployeeModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, EmployeeService, AuthService, JwtService],
})
export class AppModule {}