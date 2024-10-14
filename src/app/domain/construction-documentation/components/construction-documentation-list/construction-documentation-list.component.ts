import {
  Component,
  inject,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableColumn } from '../../../../shared/components/table/table.models';
import { ConstructionDocumentationFormComponent } from '../construction-documentation-form/construction-documentation-form.component';
import { TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'app-construction-documentation-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './construction-documentation-list.component.html',
  styleUrl: './construction-documentation-list.component.scss',
})
export class ConstructionDocumentationListComponent {
  // Inputs:
  @Input() documentations: any[] = [];

  // Services:
  private modalService = inject(NgbModal);

  // Properties:
  @ViewChild('actionsTemplate') actionsTemplate!: TemplateRef<any>;
  @ViewChild('isApprovedTemplate') isApprovedTemplate!: TemplateRef<any>;

  columns: TableColumn[] = [];

  // Methods:
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.columns = [
        { headerName: 'Id', accessorKey: 'id' },
        {
          headerName: 'Is approved',
          accessorKey: 'approved',
          cellRenderer: this.isApprovedTemplate,
        },
        { headerName: 'Document path', accessorKey: 'documentPath' },
        { headerName: 'Document type', accessorKey: 'documentType.name' },
        {
          headerName: 'Actions',
          accessorKey: 'actions',
          cellRenderer: this.actionsTemplate,
        },
      ];
    });
  }

  openFormModal(itemId: number | null = null): void {
    const modalRef = this.modalService.open(
      ConstructionDocumentationFormComponent
    );
    modalRef.componentInstance.itemId = itemId;
  }
}