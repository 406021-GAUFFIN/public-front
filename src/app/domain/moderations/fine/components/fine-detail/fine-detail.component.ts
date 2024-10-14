import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Fine } from '../../models/fine.model';
import { FineStatusEnum } from '../../models/fine-status.enum';
import { FineService } from '../../services/fine.service';
import { UpdateFineStateDTO } from '../../models/update-fine-status-dto';
import { MainContainerComponent } from '../../../../../shared/components/main-container/main-container.component';

@Component({
  selector: 'app-fine-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, MainContainerComponent],
  templateUrl: './fine-detail.component.html',
  styleUrl: './fine-detail.component.scss',
})
export class FineDetailComponent {
  fineId: number | undefined;
  fine: Fine | undefined;
  initialState: FineStatusEnum | undefined;

  FineStatusEnum = FineStatusEnum;
  fineService = inject(FineService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  error: string | null = null;
  successMessage: string | null = null;

  ngOnInit() {
    this.fineId = +this.route.snapshot.paramMap.get('id')!;
    this.updateFine();
  }

  private updateFine() {
    this.fineService.getFineById(this.fineId!).subscribe((data) => {
      this.fine = data;
      this.initialState = data.fineState;
    });
  }

  viewInfractionDetail(arg0: number) {
    throw new Error('Method not implemented.');
  }

  save() {
    let fine: UpdateFineStateDTO = {
      id: this.fine?.id,
      //TODO: Tomar user de donde sea qe se guarde
      updatedBy: 0,
      fineState: this.fine?.fineState!,
    };

    this.fineService.updateState(fine).subscribe({
      next: (response) => {
        this.updateFine();
        this.successMessage = 'Multa actualizada con éxito.';
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      },
      error: (error) => {
        this.error = `Error al actualizar la multa ${error}.`;

        // Limpia el mensaje después de 3 segundos
        setTimeout(() => {
          this.error = null;
        }, 3000);
      },
    });
  }

  goBack = (): void => {
    this.router.navigate(['fine']);
  };
}