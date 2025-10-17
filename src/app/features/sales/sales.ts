import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map, of } from 'rxjs';
import { MedicinesService } from '../medicines/medicines';

export interface Sale {
  id: number;
  medicineId: number;
  quantity: number;
  date: string;
}

/**
 * Service pour la gestion des ventes.
 * Gère l'enregistrement des ventes et la mise à jour des stocks correspondants.
 */
@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private http = inject(HttpClient);
  private medicinesService = inject(MedicinesService);
  private readonly API_URL = 'http://localhost:3000/sales';

  /** Récupère l'historique de toutes les ventes. */
  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.API_URL);
  }

  /**
   * Enregistre une nouvelle vente et met à jour le stock du médicament concerné.
   * C'est une opération en deux temps :
   * 1. La vente est enregistrée dans la base de données (POST sur /sales).
   * 2. Si la vente réussit, `switchMap` est utilisé pour enchaîner avec une deuxième requête :
   *    la mise à jour du stock du médicament (PUT sur /medicines/:id).
   * Cela garantit que le stock n'est décrémenté que si la vente a bien été créée.
   */
  addSale(sale: Omit<Sale, 'id' | 'date'>): Observable<Sale> {
    const newSale = { ...sale, date: new Date().toISOString() };

    return this.http.post<Sale>(this.API_URL, newSale).pipe(
      switchMap(createdSale => {
        const medicine = this.medicinesService.medicines().find(m => m.id === createdSale.medicineId);

        if (medicine) {
          const updatedMedicine = { ...medicine, quantity: medicine.quantity - createdSale.quantity };
          // On met à jour le médicament via son service, puis on retourne la vente créée.
          return this.medicinesService.updateMedicine(updatedMedicine).pipe(
            map(() => createdSale)
          );
        }
        // Si le médicament n'est pas trouvé (cas improbable), on retourne simplement la vente.
        return of(createdSale);
      })
    );
  }
}