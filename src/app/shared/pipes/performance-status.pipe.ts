import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'performanceStatus',
  standalone: true
})
export class PerformanceStatusPipe implements PipeTransform {

  transform(value: number): string {
    if (value >= 80) return 'Excellent';
    if (value >= 60) return 'Good';
    if (value >= 40) return 'Average';
    return 'Poor';
  }
}