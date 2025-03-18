import { Component, input } from '@angular/core';

@Component({
  selector: 'app-table-skeleton',
  imports: [],
  templateUrl: './table-skeleton.component.html',
  styleUrl: './table-skeleton.component.scss',
})
export class TableSkeletonComponent {
  rows = input<number>(5);
  cols = input<number>(4);

  getColumnsArray(): number[] {
    return Array.from({ length: this.cols() }, (_, i) => i + 1);
  }

  getRowArray(): number[] {
    return Array.from({ length: this.rows() }, (_, i) => i + 1);
  }
}
