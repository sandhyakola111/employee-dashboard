import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-metrics',
  standalone: true,

  imports: [CommonModule],

  templateUrl: './dashboard-metrics.html',
  styleUrls: ['./dashboard-metrics.scss']
})
export class DashboardMetricsComponent {

  @Input() totalEmployees = 0;

  @Input() avgPerformance = 0;
}