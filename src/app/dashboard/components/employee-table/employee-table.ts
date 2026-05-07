import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Employee } from '../../../shared/models/employee.model';
import { ChangeDetectorRef } from '@angular/core';

import {
  MatTableModule,
  MatTableDataSource
} from '@angular/material/table';

import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent
} from '@angular/material/paginator';

import {
  MatSort,
  MatSortModule,
  Sort
} from '@angular/material/sort';

@Component({
  selector: 'app-employee-table',
  standalone: true,

  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],

  templateUrl: './employee-table.html',
  styleUrls: ['./employee-table.scss']
})
export class EmployeeTableComponent
  implements AfterViewInit, OnChanges {

  @Input() employees: Employee[] = [];

  @Input() totalCount = 0;

  @Input() limit = 5;

  @Output() pageChanged =
    new EventEmitter<PageEvent>();

  @Output() sortChanged =
    new EventEmitter<Sort>();

  @Output() employeeClicked =
    new EventEmitter<Employee>();

  displayedColumns = [
    'name',
    'department',
    'performance',
    'date'
  ];
  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  dataSource =
    new MatTableDataSource<Employee>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

ngOnChanges(changes: SimpleChanges): void {

  if (changes['employees']) {

    this.dataSource.data = [...this.employees];

    this.cdr.detectChanges();
  }
}
  ngAfterViewInit(): void {

    setTimeout(() => {

      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;

      this.paginator.page.subscribe(event => {
        this.pageChanged.emit(event);
      });

      this.sort.sortChange.subscribe(event => {
        this.sortChanged.emit(event);
      });

    });
  }

  openEmployee(emp: Employee): void {
    this.employeeClicked.emit(emp);
  }
}