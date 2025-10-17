import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, throwError } from 'rxjs';

/**
 * Service de gestion de l'authentification.
 * Gère l'état de connexion de l'utilisateur, le stockage du token
 * et les appels à l'API pour le login/logout.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000';

  // Signal public pour que les autres composants puissent réagir à l'état de connexion.
  isAuthenticated = signal<boolean>(false);
  // Signal privé pour stocker le token.
  private authToken = signal<string | null>(null);

  constructor() {
    // Au démarrage du service, on vérifie si un token existe dans le localStorage
    // pour restaurer l'état de connexion (ex: après un F5).
    const token = localStorage.getItem('authToken');
    if (token) {
      this.isAuthenticated.set(true);
      this.authToken.set(token);
    }
  }

  /**
   * Tente de connecter l'utilisateur.
   * NOTE: Dans une vraie application, ceci serait un POST avec le mot de passe hashé.
   * Pour ce mock, on utilise un GET qui est INSECURE.
   */
  login(username: string, password: string): Observable<any> {
    // L'API mock `json-server` ne gère pas bien les POST pour l'authentification,
    // on simule donc avec un GET.
    return this.http.get<any[]>(`${this.API_URL}/users?username=${username}&password=${password}`).pipe(
      tap(users => {
        if (users.length > 0) {
          // Si l'utilisateur est trouvé, on stocke le token.
          const token = users[0].token;
          localStorage.setItem('authToken', token);
          this.isAuthenticated.set(true);
          this.authToken.set(token);
        } else {
          // Si aucun utilisateur ne correspond, on propage une erreur.
          throw new Error('Identifiants invalides');
        }
      })
    );
  }

  /** Déconnecte l'utilisateur et nettoie le state. */
  logout(): void {
    localStorage.removeItem('authToken');
    this.isAuthenticated.set(false);
    this.authToken.set(null);
  }

  /** Retourne le token actuel pour l'intercepteur HTTP. */
  getToken(): string | null {
    return this.authToken();
  }
}