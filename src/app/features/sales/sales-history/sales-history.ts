import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesService, Sale } from '../sales';
import { MedicinesService, Medicine } from '../../medicines/medicines';

export interface SaleDetails extends Sale {
  medicineName: string;
  medicinePrice: number;
}

@Component({
  selector: 'app-sales-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-history.html',
  styleUrls: ['./sales-history.scss']
})
export class SalesHistoryComponent {
  private salesService = inject(SalesService);
  private medicinesService = inject(MedicinesService);

  sales = signal<Sale[]>([]);
  medicines = this.medicinesService.medicines;

  salesDetails = computed(() => {
    return this.sales().map(sale => {
      const medicine = this.medicines().find(m => m.id === sale.medicineId);
      return {
        ...sale,
        medicineName: medicine ? medicine.name : 'N/A',
        medicinePrice: medicine ? medicine.price : 0
      };
    });
  });

  constructor() {
    this.salesService.getSales().subscribe(sales => this.sales.set(sales));
    this.medicinesService.getMedicines().subscribe();
  }
}
