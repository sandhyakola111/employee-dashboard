import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EmployeeService } from './employee'; // ✅ your file name
import { Employee } from '../models/employee.model';

describe('EmployeeService', () => {

  let service: EmployeeService;
  let httpMock: HttpTestingController;

  const mockEmployees: Employee[] = [
    { id: 1, name: 'Gopi', department: 'IT', performance: 80, date: '2024-01-01' },
    { id: 2, name: 'Ravi', department: 'HR', performance: 70, date: '2024-01-02' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should call API with correct params', () => {

    service.getEmployees(1, 5, '', '', '', '', 'performance', 'asc')
      .subscribe(res => {
        expect(res.body?.length).toBe(2);
      });

    const req = httpMock.expectOne(
  'http://localhost:4000/employees?_page=1&_limit=5&_sort=performance&_order=asc'
);

    expect(req.request.method).toBe('GET');

    req.flush(mockEmployees, {
      headers: { 'x-total-count': '2' }
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});