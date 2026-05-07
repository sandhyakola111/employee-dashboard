import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-filters',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './dashboard-filters.html',
  styleUrls: ['./dashboard-filters.scss']
})
export class DashboardFiltersComponent {

  @Output() filtersChanged = new EventEmitter<any>();

  filters = {
    search: '',
    dept: '',
    fromDate: '',
    toDate: ''
  };

  emitFilters(): void {
    this.filtersChanged.emit(this.filters);
  }

  reset(): void {

    this.filters = {
      search: '',
      dept: '',
      fromDate: '',
      toDate: ''
    };

    this.emitFilters();
  }
}