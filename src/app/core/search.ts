import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchTerm = signal<string>('');
  filter = signal<'low-stock' | null>(null);

  setSearchTerm(term: string) {
    this.searchTerm.set(term);
  }

  setFilter(filter: 'low-stock' | null) {
    this.filter.set(filter);
  }
}
