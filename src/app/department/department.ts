import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../shared/services/employee';
import { Employee } from '../shared/models/employee.model';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './department.html',
  styleUrls: ['./department.scss']
})
export class DepartmentComponent implements OnInit {

  employees: Employee[] = [];
  departmentName = '';

  constructor(
    private route: ActivatedRoute,
    private empService: EmployeeService
  ) {}

  ngOnInit() {
    // this.departmentName = this.route.snapshot.paramMap.get('name') || '';

    // this.empService.getEmployees().subscribe(data => {
    //   this.employees = res
    // });
  }
}