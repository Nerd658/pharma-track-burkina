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

/**
 * Service pour la gestion des données des médicaments.
 * Centralise tous les appels HTTP et gère l'état réactif de la liste des médicaments.
 */
@Injectable({
  providedIn: 'root'
})
export class MedicinesService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/medicines';

  // Le signal `medicines` est la source de vérité pour la liste des médicaments.
  // Les composants s'abonnent à ce signal pour afficher les données.
  medicines = signal<Medicine[]>([]);

  /** Récupère la liste complète des médicaments et met à jour le signal. */
  getMedicines(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(this.API_URL).pipe(
      // `tap` permet d'effectuer une action (effet de bord) sans modifier la réponse de l'observable.
      // Ici, on met à jour notre signal avec les données fraîches de l'API.
      tap(medicines => this.medicines.set(medicines))
    );
  }

  /** Ajoute un nouveau médicament. */
  addMedicine(medicine: Omit<Medicine, 'id'>): Observable<Medicine> {
    return this.http.post<Medicine>(this.API_URL, medicine).pipe(
      // Met à jour l'état local de manière optimiste (sans attendre un nouveau `get`).
      tap(newMedicine => this.medicines.update(medicines => [...medicines, newMedicine]))
    );
  }

  /** Met à jour un médicament existant. */
  updateMedicine(medicine: Medicine): Observable<Medicine> {
    return this.http.put<Medicine>(`${this.API_URL}/${medicine.id}`, medicine).pipe(
      tap(updatedMedicine => this.medicines.update(medicines =>
        medicines.map(m => m.id === updatedMedicine.id ? updatedMedicine : m)
      ))
    );
  }

  /** Supprime un médicament. */
  deleteMedicine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(() => this.medicines.update(medicines => medicines.filter(m => m.id !== id)))
    );
  }
}