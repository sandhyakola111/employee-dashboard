import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';

import { Employee } from '../../../shared/models/employee.model';

import { DashboardFiltersComponent } from '../dashboard-filters/dashboard-filters';
import { DashboardMetricsComponent } from '../dashboard-metrics/dashboard-metrics';
import { EmployeeTableComponent } from '../employee-table/employee-table';
import { DashboardChartsComponent } from '../../dashboard-charts/dashboard-charts.component';

@Component({
  selector: 'app-dashboard-view',
  standalone: true,

  imports: [
    CommonModule,
    MatToolbarModule,

    DashboardFiltersComponent,
    DashboardMetricsComponent,
    EmployeeTableComponent,
    DashboardChartsComponent
  ],

  templateUrl: './dashboard-view.html',
  styleUrls: ['./dashboard-view.scss']
})
export class DashboardViewComponent {

  @Input() employees: Employee[] = [];

  @Input() totalEmployees = 0;

  @Input() avgPerformance = 0;

  @Input() totalCount = 0;

  @Input() limit = 5;

  @Input() errorMsg = '';

  @Output() filterChange = new EventEmitter<any>();

  @Output() pageChange = new EventEmitter<any>();

  @Output() sortChange = new EventEmitter<any>();

  @Output() employeeClick = new EventEmitter<Employee>();
}