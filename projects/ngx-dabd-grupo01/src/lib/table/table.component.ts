import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TableColumn, TablePagination } from './table.models';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule, NgbTooltipModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  // Inputs:

  @Input() items!: any[];
  @Input() columns!: TableColumn[];
  @Input() isLoading?: boolean | null = false;
  @Input() pagination?: TablePagination;
  @Input() height?: string = '580px';
  @Input() showSearchBar?: boolean = true;
  @Input() showExportOptions?: boolean = true;

  // Outputs:

  @Output() searchValueChange = new EventEmitter<string>();

  // Properties:

  sizeOptions: number[] = [10, 25, 50];
  searchValue: string = '';

  // Methods:

  onPageChange(page: number): void {
    if (this.pagination) {
      this.pagination.onPageChange(page);
    }
  }

  onItemsPerPageChange(itemsPerPage: number): void {
    if (this.pagination) {
      this.pagination.size = itemsPerPage;
      this.pagination.onPageSizeChange(itemsPerPage);
    }
  }

  onSearchValueChange(): void {
    this.searchValueChange.emit(this.searchValue);
  }
}