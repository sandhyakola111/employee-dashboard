import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { EmployeeService } from '../shared/services/employee';
import { Employee } from '../shared/models/employee.model';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent {

  private route = inject(ActivatedRoute);
  private service = inject(EmployeeService);

  // ✅ Signals (modern state)
  emp = signal<Employee | null>(null);
  loading = signal(true);
  error = signal('');

  constructor() {

    const idParam = this.route.snapshot.paramMap.get('id');

    console.log('Route param:', idParam);

    if (!idParam || isNaN(Number(idParam))) {
      this.error.set('Invalid Employee ID');
      this.loading.set(false);
      return;
    }

    const id = Number(idParam);

    this.loadEmployee(id);
  }

  loadEmployee(id: number) {

    this.loading.set(true);
    this.emp.set(null);
    this.error.set('');

    this.service.getEmployeeById(id).subscribe({
      next: (res: Employee) => {
        console.log('✅ SUCCESS:', res);

        this.emp.set(res);
        this.loading.set(false);
      },

      error: (err) => {
        console.log('❌ ERROR:', err);

        this.error.set('Failed to load employee');
        this.loading.set(false);
      }
    });
  }
  goBack(): void {

  window.location.href = '/';
}
}