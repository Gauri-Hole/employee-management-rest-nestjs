// src/employees/employee.model.ts
import * as mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  skills: [String],
  availableForJob: Boolean,
});

export interface Employee extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  skills: string[];
  availableForJob: boolean;
}
