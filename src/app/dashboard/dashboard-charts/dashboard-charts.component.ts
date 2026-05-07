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
export class DashboardChartsComponent
  implements AfterViewInit, OnChanges {

  @Input() data: Employee[] = [];

  @ViewChild('barCanvas')
  barRef!: ElementRef<HTMLCanvasElement>;

  @ViewChild('lineCanvas')
  lineRef!: ElementRef<HTMLCanvasElement>;

  @ViewChild('pieCanvas')
  pieRef!: ElementRef<HTMLCanvasElement>;

  @ViewChild('heatmapCanvas')
  heatmapRef!: ElementRef<HTMLCanvasElement>;

  barChart: any;
  lineChart: any;
  pieChart: any;
  heatmapChart: any;

  private viewInitialized = false;

  // ================= LIFECYCLE =================

  ngAfterViewInit(): void {

    this.viewInitialized = true;

    this.tryRenderCharts();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['data']) {

      this.tryRenderCharts();
    }
  }

  // ================= MAIN =================

  tryRenderCharts(): void {

    if (!this.viewInitialized) return;

    if (!this.data || this.data.length === 0) return;

    setTimeout(() => {

      this.renderCharts();

    }, 100);
  }

  renderCharts(): void {

    this.destroyCharts();

    this.createBarChart();
    this.createLineChart();
    this.createPieChart();
    this.createHeatmap();
  }

  destroyCharts(): void {

    this.barChart?.destroy();
    this.lineChart?.destroy();
    this.pieChart?.destroy();
    this.heatmapChart?.destroy();

    this.barChart = null;
    this.lineChart = null;
    this.pieChart = null;
    this.heatmapChart = null;
  }

  // ================= BAR CHART =================

  createBarChart(): void {

    const ctx =
      this.barRef?.nativeElement?.getContext('2d');

    if (!ctx) return;

    const map: Record<string, number> = {};

    this.data.forEach(emp => {

      map[emp.department] =
        (map[emp.department] || 0) + 1;
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
      }
    });
  }

  // ================= LINE CHART =================

  createLineChart(): void {

    const ctx =
      this.lineRef?.nativeElement?.getContext('2d');

    if (!ctx) return;

    this.lineChart = new Chart(ctx, {

      type: 'line',

      data: {

        labels: this.data.map(
          (_, i) => `Emp ${i + 1}`
        ),

        datasets: [
          {
            label: 'Performance',

            data: this.data.map(
              emp => emp.performance
            ),

            tension: 0.4
          }
        ]
      }
    });
  }

  // ================= PIE CHART =================

  createPieChart(): void {

    const ctx =
      this.pieRef?.nativeElement?.getContext('2d');

    if (!ctx) return;

    const map: Record<string, number> = {};

    this.data.forEach(emp => {

      map[emp.department] =
        (map[emp.department] || 0) + 1;
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
      }
    });
  }

  // ================= HEATMAP =================

  createHeatmap(): void {

    const ctx =
      this.heatmapRef?.nativeElement?.getContext('2d');

    if (!ctx) return;

    this.heatmapChart = new Chart(ctx, {

      type: 'bar',

      data: {

        labels: this.data.map(
          emp => emp.name
        ),

        datasets: [
          {
            label: 'Performance',

            data: this.data.map(
              emp => emp.performance
            )
          }
        ]
      },

      options: {

        indexAxis: 'y',

        scales: {
          x: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }
}