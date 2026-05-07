import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DateRange } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class FilterService {

  private dateRangeSubject = new BehaviorSubject<DateRange | null>(null);

  dateRange$ = this.dateRangeSubject.asObservable();

  setDateRange(range: DateRange) {
    this.dateRangeSubject.next(range);
  }
}