import { Client } from './../../shared/models/clientRent.model';
import { Injectable } from '@angular/core';

/**
 * Service de gestion des tokens
 */
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  /**
   * Enregistre le token de connexion en localStorage
   * @param token Token de connexion récupéré depuis l'API
   */
  public saveToken(token: string): void {
    localStorage.removeItem('x-auth-token');
    localStorage.setItem('x-auth-token', token);
  }

  /**
   * Récupère le token de connexion depuis le localStorage
   * @returns Le token stocké
   */
  public getToken(): string {
    return localStorage.getItem('x-auth-token');
  }

  /**
   * Enregistre le client connecté en localStorage
   * @param client Le client connecté
   */
  public saveClient(client: Client): void {
    localStorage.removeItem('x-auth-user');
    localStorage.setItem('x-auth-user', JSON.stringify(client));
  }

  /**
   * Récupère le client connecté depuis le localStorage
   * @returns Le client connecté
   */
  public getClient(): Client {
    let client: Client = new Client({
      id: -1,
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: '',
      address: '',
      additionalAddress: '',
      postalCode: '',
      city: ''
    });

    const jsonClient = JSON.parse(localStorage.getItem('x-auth-user'));

    if (jsonClient) {
      client = Client.fromJson(jsonClient);
    }

    return client;
  }

  /**
   * Déconnecte un utilisateur en vidant le localStorage
   */
  public logOut(): void {
    localStorage.clear();
  }
}
