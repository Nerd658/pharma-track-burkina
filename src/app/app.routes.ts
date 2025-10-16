import { Routes } from '@angular/router';
import { authGuard } from './core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: 'medicaments',
    loadComponent: () => import('./features/medicines/medicines/medicines').then(m => m.MedicinesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'ventes/enregistrer',
    loadComponent: () => import('./features/sales/sales/sales').then(m => m.SalesComponent)
  },
  {
    path: 'ventes/historique',
    loadComponent: () => import('./features/sales/sales-history/sales-history').then(m => m.SalesHistoryComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent)
  }
];
