import { Component, inject, computed, signal, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { MedicinesService } from '../../medicines/medicines';
import { SalesService, Sale } from '../../sales/sales';
import { SearchService } from '../../../core';
import { Router } from '@angular/router';

declare var feather: any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: []
})
export class DashboardComponent implements AfterViewInit {
  private medicinesService = inject(MedicinesService);
  private salesService = inject(SalesService);
  private searchService = inject(SearchService);
  private router = inject(Router);

  @ViewChild('salesChart') salesChart!: ElementRef<HTMLCanvasElement>;

  medicines = this.medicinesService.medicines;
  sales = signal<Sale[]>([]);

  // Stats réactives. Se recalculent automatiquement si `medicines` ou `sales` changent.
  lowStockMedicines = computed(() => this.medicines().filter(m => m.quantity < 5));
  todaySales = computed(() => {
    const today = new Date().toISOString().split('T')[0];
    return this.sales().filter(s => s.date.startsWith(today));
  });
  totalRevenueToday = computed(() => {
    return this.todaySales().reduce((total, sale) => {
      const medicine = this.medicines().find(m => m.id === sale.medicineId);
      return total + (medicine ? medicine.price * sale.quantity : 0);
    }, 0);
  });
  totalSalesToday = computed(() => this.todaySales().length);

  constructor() {
    this.medicinesService.getMedicines().subscribe();
    this.salesService.getSales().subscribe(sales => this.sales.set(sales));
  }

  // Navigue vers la page des médicaments en activant le filtre "stock faible".
  viewLowStock(): void {
    this.searchService.setFilter('low-stock');
    this.router.navigate(['/medicaments']);
  }

  // Initialisation des librairies tierces (Feather, Chart.js) après le rendu de la vue.
  ngAfterViewInit() {
    feather.replace();
    this.createSalesChart();
  }

  private createSalesChart() {
    const weeklySales = this.getWeeklySales();
    new Chart(this.salesChart.nativeElement, {
      type: 'line',
      data: {
        labels: Object.keys(weeklySales),
        datasets: [{
          label: 'Ventes journalières',
          data: Object.values(weeklySales),
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 2,
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  private getWeeklySales(): { [week: string]: number } {
    const weeklySales: { [week: string]: number } = {};
    this.sales().forEach(sale => {
      const date = new Date(sale.date);
      const week = `${date.getFullYear()}-W${this.getWeekNumber(date)}`;
      if (!weeklySales[week]) {
        weeklySales[week] = 0;
      }
      weeklySales[week]++;
    });
    return weeklySales;
  }

  private getWeekNumber(d: Date): number {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }
}