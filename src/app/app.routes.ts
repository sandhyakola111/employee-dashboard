import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./dashboard/container/dashboard-container/dashboard-container')
        .then(m => m.DashboardContainerComponent)
  },

  {
    path: 'employee/:id',
    loadComponent: () =>
      import('./employee-detail/employee-detail.component')
        .then(m => m.EmployeeDetailComponent)
  }

];