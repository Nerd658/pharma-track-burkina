import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Medicine } from '../medicines';
import { HighlightPipe } from '../../../shared/pipes/highlight-pipe';

@Component({
  selector: 'app-medicines-table',
  standalone: true,
  imports: [CommonModule, HighlightPipe],
  templateUrl: './medicines-table.html',
  styleUrls: ['./medicines-table.scss']
})
export class MedicinesTableComponent {
  medicines = input.required<Medicine[]>();
  searchTerm = input<string>('');
  sortColumn = input<keyof Medicine | null>(null);
  sortDirection = input<'asc' | 'desc'>('asc');

  sort = output<keyof Medicine>();
  edit = output<Medicine>();
  delete = output<number>();
}
