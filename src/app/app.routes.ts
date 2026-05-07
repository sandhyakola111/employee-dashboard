import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },

  {
    path: 'employee/:id',
    loadComponent: () =>
      import('./employee-detail/employee-detail.component')
        .then(m => m.EmployeeDetailComponent)
  }

];