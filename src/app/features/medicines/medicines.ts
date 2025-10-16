import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Medicine {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  expirationDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class MedicinesService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/medicines';

  medicines = signal<Medicine[]>([]);

  getMedicines(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(this.API_URL).pipe(
      tap(medicines => this.medicines.set(medicines))
    );
  }

  addMedicine(medicine: Omit<Medicine, 'id'>): Observable<Medicine> {
    return this.http.post<Medicine>(this.API_URL, medicine).pipe(
      tap(newMedicine => this.medicines.update(medicines => [...medicines, newMedicine]))
    );
  }

  updateMedicine(medicine: Medicine): Observable<Medicine> {
    return this.http.put<Medicine>(`${this.API_URL}/${medicine.id}`, medicine).pipe(
      tap(updatedMedicine => this.medicines.update(medicines =>
        medicines.map(m => m.id === updatedMedicine.id ? updatedMedicine : m)
      ))
    );
  }

  deleteMedicine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(() => this.medicines.update(medicines => medicines.filter(m => m.id !== id)))
    );
  }
}
