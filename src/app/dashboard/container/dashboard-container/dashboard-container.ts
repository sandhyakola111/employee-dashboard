import { Component, OnInit, OnDestroy } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Router,
  NavigationEnd
} from '@angular/router';

import { filter, Subscription } from 'rxjs';

import { EmployeeService }
from '../../../shared/services/employee';

import { Employee }
from '../../../shared/models/employee.model';

import { DashboardViewComponent }
from '../../components/dashboard-view/dashboard-view';

@Component({
  selector: 'app-dashboard-container',

  standalone: true,

  imports: [
    CommonModule,
    DashboardViewComponent
  ],

  templateUrl: './dashboard-container.html'
})
export class DashboardContainerComponent
  implements OnInit, OnDestroy {

  employees: Employee[] = [];

  totalEmployees = 0;

  avgPerformance = 0;

  totalCount = 0;

  page = 1;

  limit = 5;

  errorMsg = '';

  filters = {
    search: '',
    dept: '',
    fromDate: '',
    toDate: ''
  };

  sortField = 'performance';

  sortOrder = 'asc';

  routerSub!: Subscription;

  constructor(
    private empService: EmployeeService,
    private router: Router
  ) {}

  // ================= INIT =================

  ngOnInit(): void {

    this.loadEmployees();

    // Reload dashboard after navigation back
    this.routerSub = this.router.events
      .pipe(
        filter(event =>
          event instanceof NavigationEnd
        )
      )
      .subscribe((event: any) => {

        if (event.url === '/' ||
            event.urlAfterRedirects === '/') {

          this.loadEmployees();
        }
      });
  }

  // ================= DESTROY =================

  ngOnDestroy(): void {

    this.routerSub?.unsubscribe();
  }

  // ================= API =================

  loadEmployees(): void {

    this.empService
      .getEmployees(
        this.page,
        this.limit,
        this.filters.search,
        this.filters.dept,
        this.filters.fromDate,
        this.filters.toDate,
        this.sortField,
        this.sortOrder
      )
      .subscribe({

        next: (res) => {

          const data = res.body ?? [];

          // IMPORTANT
          this.employees = [...data];

          this.totalCount =
            Number(
              res.headers.get('x-total-count')
            ) || data.length;

          this.calculateMetrics(data);

          this.errorMsg = '';

          console.log('Dashboard Reloaded');
        },

        error: () => {

          this.errorMsg =
            'Failed to load employee data';
        }
      });
  }

  // ================= METRICS =================

  calculateMetrics(data: Employee[]): void {

    this.totalEmployees = data.length;

    this.avgPerformance = data.length
      ? data.reduce(
          (sum, e) => sum + e.performance,
          0
        ) / data.length
      : 0;
  }

  // ================= FILTERS =================

  onFilterChange(filters: any): void {

    this.filters = filters;

    this.page = 1;

    this.loadEmployees();
  }

  // ================= PAGINATION =================

  onPageChange(event: any): void {

    this.page = event.pageIndex + 1;

    this.limit = event.pageSize;

    this.loadEmployees();
  }

  // ================= SORT =================

  onSortChange(event: any): void {

    this.sortField = event.active;

    this.sortOrder =
      event.direction || 'asc';

    this.loadEmployees();
  }

  // ================= NAVIGATION =================

  openEmployee(emp: Employee): void {

    this.router.navigate([
      '/employee',
      emp.id
    ]);
  }
}