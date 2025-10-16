import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000';

  isAuthenticated = signal<boolean>(false);
  private authToken = signal<string | null>(null);

  constructor() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.isAuthenticated.set(true);
      this.authToken.set(token);
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.API_URL}/users?username=${username}&password=${password}`).pipe(
      tap(users => {
        if (users.length > 0) {
          const token = users[0].token;
          localStorage.setItem('authToken', token);
          this.isAuthenticated.set(true);
          this.authToken.set(token);
        } else {
          throw new Error('Invalid credentials');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isAuthenticated.set(false);
    this.authToken.set(null);
  }

  getToken(): string | null {
    return this.authToken();
  }
}
