import {
  HttpClient,
  HttpResponse,
  HttpParams
} from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:4000/employees';

  constructor(private http: HttpClient) {}

  // ================= GET EMPLOYEES =================

  getEmployees(
    page: number,
    limit: number,
    search: string,
    dept: string,
    fromDate: string,
    toDate: string,
    sortField: string,
    sortOrder: string
  ): Observable<HttpResponse<Employee[]>> {

    let params = new HttpParams()
      .set('_page', page)
      .set('_limit', limit)
      .set('_sort', sortField)
      .set('_order', sortOrder);

    // Search
    if (search) {
      params = params.set('q', search);
    }

    // Department
    if (dept) {
      params = params.set('department', dept);
    }

    // From Date
    if (fromDate) {
      params = params.set('date_gte', fromDate);
    }

    // To Date
    if (toDate) {
      params = params.set('date_lte', toDate);
    }

    return this.http.get<Employee[]>(
      this.baseUrl,
      {
        params,
        observe: 'response'
      }
    );
  }

  // ================= GET EMPLOYEE BY ID =================

  getEmployeeById(id: number): Observable<Employee> {

    return this.http.get<Employee>(
      `${this.baseUrl}/${id}`
    );
  }
}