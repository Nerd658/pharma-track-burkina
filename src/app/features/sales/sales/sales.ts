import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { SalesService } from '../sales';
import { MedicinesService, Medicine } from '../../medicines/medicines';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sales.html',
  styleUrls: ['./sales.scss']
})
export class SalesComponent {
  private salesService = inject(SalesService);
  private medicinesService = inject(MedicinesService);

  medicines = this.medicinesService.medicines;
  selectedMedicineId: number | null = null;
  quantity: number | null = null;
  isLoading = signal(false);

  constructor() {
    this.medicinesService.getMedicines().subscribe();
  }

  recordSale(): void {
    if (this.selectedMedicineId && this.quantity) {
      this.isLoading.set(true);
      this.salesService.addSale({ medicineId: this.selectedMedicineId, quantity: this.quantity }).pipe(
        finalize(() => this.isLoading.set(false))
      ).subscribe(() => {
        this.selectedMedicineId = null;
        this.quantity = null;
        // Optionally, add a success message
      });
    }
  }
}
