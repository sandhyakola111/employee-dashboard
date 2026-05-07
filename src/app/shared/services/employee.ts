import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  private baseUrl = "http://localhost:4000/employees"

  constructor(private http: HttpClient) {}

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

    let url = `${this.baseUrl}?_page=${page}&_limit=${limit}`;

    if (search) url += `&q=${search}`;
    if (dept) url += `&department=${dept}`;
    if (fromDate) url += `&date_gte=${fromDate}`;
    if (toDate) url += `&date_lte=${toDate}`;

    url += `&_sort=${sortField}&_order=${sortOrder}`;

    return this.http.get<Employee[]>(url, { observe: 'response' });
  }

// getEmployeeById(id: number) {
//   return this.http.get<Employee>(`http://localhost:4000/employees/${id}`);
// }
getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }
}
