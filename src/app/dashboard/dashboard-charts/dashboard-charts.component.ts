import {
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { Employee } from '../../shared/models/employee.model';

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.scss']
})
export class DashboardChartsComponent implements AfterViewInit, OnChanges {

  @Input() data: Employee[] = [];

  @ViewChild('barCanvas') barRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineCanvas') lineRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieCanvas') pieRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('heatmapCanvas') heatmapRef!: ElementRef<HTMLCanvasElement>;

  barChart: any;
  lineChart: any;
  pieChart: any;
  heatmapChart: any;

  ngAfterViewInit() {
    this.renderCharts();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && !changes['data'].firstChange) {
      this.renderCharts();
    }
  }

  // ================= MAIN =================

  renderCharts() {
    if (!this.data || !this.data.length) return;

    setTimeout(() => {
      this.destroyCharts();
      this.createBarChart();
      this.createLineChart();
      this.createPieChart();
      this.createHeatmap();
    }, 0);
  }

  destroyCharts() {
    this.barChart?.destroy();
    this.lineChart?.destroy();
    this.pieChart?.destroy();
    this.heatmapChart?.destroy();
  }

  // ================= BAR =================

  createBarChart() {
    const ctx = this.barRef?.nativeElement?.getContext('2d');
    if (!ctx) return;

    const map: Record<string, number> = {};

    this.data.forEach(e => {
      map[e.department] = (map[e.department] || 0) + 1;
    });

    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(map),
        datasets: [
          {
            label: 'Employees',
            data: Object.values(map)
          }
        ]
      },
      options: {
        onClick: (_, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const dept = Object.keys(map)[index];

            // 🔥 Drill-down (emit event later if needed)
            alert(`Selected Department: ${dept}`);
          }
        }
      }
    });
  }

  // ================= LINE =================

  createLineChart() {
    const ctx = this.lineRef?.nativeElement?.getContext('2d');
    if (!ctx) return;

    this.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.data.map((_, i) => `Emp ${i + 1}`),
        datasets: [
          {
            label: 'Performance',
            data: this.data.map(e => e.performance),
            tension: 0.4
          }
        ]
      }
    });
  }

  // ================= PIE =================

  createPieChart() {
    const ctx = this.pieRef?.nativeElement?.getContext('2d');
    if (!ctx) return;

    const map: Record<string, number> = {};

    this.data.forEach(e => {
      map[e.department] = (map[e.department] || 0) + 1;
    });

    this.pieChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(map),
        datasets: [
          {
            label: 'Departments',
            data: Object.values(map)
          }
        ]
      },
      options: {
        onClick: (_, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const dept = Object.keys(map)[index];

            alert(`Selected Department: ${dept}`);
          }
        }
      }
    });
  }

  // ================= HEATMAP =================

  createHeatmap() {
    const ctx = this.heatmapRef?.nativeElement?.getContext('2d');
    if (!ctx) return;

    this.heatmapChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.data.map(e => e.name),
        datasets: [
          {
            label: 'Performance',
            data: this.data.map(e => e.performance)
          }
        ]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: { beginAtZero: true, max: 100 }
        },
        onClick: (_, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const emp = this.data[index];

            alert(`Selected Employee: ${emp.name}`);
          }
        }
      }
    });
  }
}