import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { MedicinesService, Medicine } from '../medicines';
import { MedicineFormComponent } from '../medicine-form/medicine-form';
import { MedicinesTableComponent } from '../medicines-table/medicines-table';
import { SearchService } from '../../../core';
import { PaginationComponent } from '../../../shared';

@Component({
  selector: 'app-medicines',
  standalone: true,
  imports: [CommonModule, MedicineFormComponent, MedicinesTableComponent, PaginationComponent],
  templateUrl: './medicines.html',
  styleUrls: ['./medicines.scss']
})
export class MedicinesComponent {
  private medicinesService = inject(MedicinesService);
  private searchService = inject(SearchService);

  // Source de vérité : les signaux venant des services.
  medicines = this.medicinesService.medicines;
  searchTerm = this.searchService.searchTerm;

  // Signaux pour le tri et la pagination de la table.
  sortColumn = signal<keyof Medicine | null>(null);
  sortDirection = signal<'asc' | 'desc'>('asc');
  currentPage = signal(1);
  itemsPerPage = signal(10);

  // Pipeline de données : medicines -> filtrés -> triés -> paginés.
  // 1. Filtre par terme de recherche ou filtre "stock faible".
  filteredMedicines = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const filter = this.searchService.filter();
    let medicines = this.medicines();

    if (filter === 'low-stock') {
      medicines = medicines.filter(m => m.quantity < 10);
    }
    if (term) {
      medicines = medicines.filter(m => m.name.toLowerCase().includes(term));
    }
    return medicines;
  });

  // 2. Trie la liste filtrée.
  sortedMedicines = computed(() => {
    const medicines = [...this.filteredMedicines()];
    const column = this.sortColumn();
    const direction = this.sortDirection();

    if (!column) {
      return medicines;
    }

    return medicines.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  });

  // 3. Applique la pagination.
  paginatedMedicines = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    return this.sortedMedicines().slice(startIndex, startIndex + this.itemsPerPage());
  });

  // État local pour le UI
  showForm = signal(false); // Gère la visibilité du formulaire modal.
  selectedMedicine = signal<Medicine | null>(null); // `null` pour un ajout, un objet `Medicine` pour une modif.
  isLoading = signal(false); // Gère le spinner de chargement.

  constructor() {
    this.medicinesService.getMedicines().subscribe();
  }

  // Nettoie le filtre de recherche en quittant la page.
  ngOnDestroy() {
    this.searchService.setFilter(null);
  }

  // Gère le clic sur un en-tête de colonne pour le tri.
  sort(column: keyof Medicine): void {
    if (this.sortColumn() === column) {
      this.sortDirection.update(dir => dir === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  // Ouvre le formulaire en mode "ajout".
  addMedicine(): void {
    this.selectedMedicine.set(null);
    this.showForm.set(true);
  }

  // Ouvre le formulaire en mode "modification".
  editMedicine(medicine: Medicine): void {
    this.selectedMedicine.set(medicine);
    this.showForm.set(true);
  }

  // Gère l'ajout ou la modification d'un médicament.
  saveMedicine(medicine: Medicine): void {
    this.isLoading.set(true);
    const saveOperation = medicine.id
      ? this.medicinesService.updateMedicine(medicine)
      : this.medicinesService.addMedicine(medicine);

    saveOperation.pipe(
      finalize(() => {
        this.isLoading.set(false);
        this.closeForm();
      })
    ).subscribe();
  }

  deleteMedicine(id: number): void {
    this.medicinesService.deleteMedicine(id).subscribe();
  }

  closeForm(): void {
    this.showForm.set(false);
  }
}