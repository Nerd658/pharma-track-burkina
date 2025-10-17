import { Component, inject, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchService, AuthService } from '../core';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class LayoutComponent implements OnDestroy {
  private searchService = inject(SearchService);
  private authService = inject(AuthService);
  private router = inject(Router);

  private searchSubject = new Subject<string>();
  private searchSubscription: Subscription;

  isAuthenticated = this.authService.isAuthenticated;

  constructor() {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchService.setSearchTerm(term);
    });
  }

  onSearch(term: string): void {
    this.searchSubject.next(term);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
