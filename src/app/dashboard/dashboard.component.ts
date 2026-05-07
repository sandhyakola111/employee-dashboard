import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { EmployeeService } from '../shared/services/employee';
import { Employee } from '../shared/models/employee.model';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

import { PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

import { PerformanceStatusPipe } from '../shared/pipes/performance-status.pipe';
import { DashboardChartsComponent } from './dashboard-charts/dashboard-charts.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatToolbarModule,
    MatSortModule,
    MatPaginatorModule,
    PerformanceStatusPipe,
    DashboardChartsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<Employee>();
  displayedColumns = ['name', 'department', 'performance', 'date'];

  totalEmployees = 0;
  avgPerformance = 0;
  errorMsg = '';

  page = 1;
  limit = 5;
  totalCount = 0;

  searchText = '';
  selectedDept = '';
  fromDate = '';
  toDate = '';

  sortField = 'performance';
  sortOrder = 'asc';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private empService: EmployeeService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  // ================= INIT =================

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {

    // Pagination
    this.paginator.page.subscribe(event => {
      this.page = event.pageIndex + 1;
      this.limit = event.pageSize;
      this.loadData();
    });

    // Sorting
    this.sort.sortChange.subscribe(sortEvent => {
      this.sortField = sortEvent.active;
      this.sortOrder = sortEvent.direction || 'asc';
      this.page = 1;
      this.loadData();
    });
  }

  // ================= API =================

  loadData() {
    this.empService
      .getEmployees(
        this.page,
        this.limit,
        this.searchText,
        this.selectedDept,
        this.fromDate,
        this.toDate,
        this.sortField,
        this.sortOrder
      )
      .subscribe({
        next: (res) => {
          this.errorMsg = '';

          const data = res.body ?? [];
          this.dataSource.data = data;

          this.totalCount =
            Number(res.headers.get('x-total-count')) || data.length;

          this.calculateMetrics(data);
        },
        error: () => {
          setTimeout(() => {
            this.errorMsg = 'Failed to load data. Please try again.';
          });
        }
      });
  }

  // ================= METRICS =================

  calculateMetrics(data: Employee[]) {
    this.totalEmployees = data.length;

    this.avgPerformance = data.length
      ? data.reduce((sum, e) => sum + e.performance, 0) / data.length
      : 0;
  }

  // ================= FILTERS =================

  searchEmployee(value: string | undefined) {
    this.searchText = value ?? '';
    this.page = 1;
    this.loadData();
  }

  filterByDept(dept: string) {
    this.selectedDept = dept;
    this.page = 1;
    this.loadData();
  }

  resetFilters() {
    this.searchText = '';
    this.selectedDept = '';
    this.fromDate = '';
    this.toDate = '';
    this.page = 1;
    this.loadData();
  }

  onFromDate(event: Event) {
    this.fromDate = (event.target as HTMLInputElement).value;
    this.loadData();
  }

  onToDate(event: Event) {
    this.toDate = (event.target as HTMLInputElement).value;
    this.loadData();
  }

  // ================= NAVIGATION =================

openEmployee(emp: Employee) {
  console.log('NAVIGATING TO:', emp.id);
  this.router.navigate(['/employee', emp.id]);
}
}