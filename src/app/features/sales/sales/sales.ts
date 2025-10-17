import { Component, inject, signal, computed } from '@angular/core';
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
  isLoading = signal(false);

  // On utilise des signaux pour gérer les entrées du formulaire de manière réactive.
  selectedMedicineId = signal<number | null>(null);
  quantity = signal<number | null>(null);

  // Un signal `computed` qui dérive le médicament complet à partir de l'ID sélectionné.
  selectedMedicine = computed(() => {
    const medId = this.selectedMedicineId();
    if (!medId) {
      return null;
    }
    return this.medicines().find(m => m.id === medId);
  });

  // Un autre `computed` pour calculer le total de la vente en temps réel.
  saleTotal = computed(() => {
    const medicine = this.selectedMedicine();
    const qty = this.quantity();
    if (medicine && qty && qty > 0) {
      return medicine.price * qty;
    }
    return 0;
  });

  constructor() {
    this.medicinesService.getMedicines().subscribe();
  }

  recordSale(): void {
    const medId = this.selectedMedicineId();
    const qty = this.quantity();

    if (medId && qty) {
      this.isLoading.set(true);
      this.salesService.addSale({ medicineId: medId, quantity: qty }).pipe(
        finalize(() => this.isLoading.set(false))
      ).subscribe(() => {
        // Réinitialise le formulaire après la vente
        this.selectedMedicineId.set(null);
        this.quantity.set(null);
      });
    }
  }
}