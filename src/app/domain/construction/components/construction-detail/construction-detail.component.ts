import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstructionService } from '../../services/construction.service';
import {
  ConstructionResponseDto,
  ConstructionTab,
} from '../../models/construction.model';
import { CommonModule } from '@angular/common';
import { ConstructionWorkersComponent } from '../../../workers/components/construction-workers/construction-workers.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';

@Component({
  selector: 'app-construction-detail',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    TableComponent,
    ConstructionWorkersComponent,
  ],
  templateUrl: './construction-detail.component.html',
  styleUrl: './construction-detail.component.css',
})
export class ConstructionDetailComponent implements OnInit {
  // Services:
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private constructionService = inject(ConstructionService);

  // Properties:
  construction: ConstructionResponseDto | undefined;
  activeTab: ConstructionTab = 'documentation';

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.getConstructionById(id);
    });
  }

  getConstructionById(id: number) {
    this.constructionService
      .getConstructionById(id)
      .subscribe((construction) => {
        this.construction = construction;
      });
  }

  setActiveTab(tab: ConstructionTab): void {
    this.activeTab = tab;
  }

  isActiveTab(tab: ConstructionTab): boolean {
    return this.activeTab === tab;
  }

  goBack(): void {
    this.router.navigate(['constructions']);
  }
}