import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map } from 'rxjs';
import { MedicinesService } from '../medicines/medicines';

export interface Sale {
  id: number;
  medicineId: number;
  quantity: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private http = inject(HttpClient);
  private medicinesService = inject(MedicinesService);
  private readonly API_URL = 'http://localhost:3000/sales';

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.API_URL);
  }

  addSale(sale: Omit<Sale, 'id' | 'date'>): Observable<Sale> {
    const newSale = { ...sale, date: new Date().toISOString() };
    return this.http.post<Sale>(this.API_URL, newSale).pipe(
      switchMap(createdSale => {
        const medicine = this.medicinesService.medicines().find(m => m.id === createdSale.medicineId);
        if (medicine) {
          const updatedMedicine = { ...medicine, quantity: medicine.quantity - createdSale.quantity };
          return this.medicinesService.updateMedicine(updatedMedicine).pipe(
            map(() => createdSale)
          );
        }
        return new Observable<Sale>(sub => sub.next(createdSale));
      })
    );
  }
}
