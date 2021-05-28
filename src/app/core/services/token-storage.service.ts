import { Client } from './../../shared/models/clientRent.model';
import { Injectable } from '@angular/core';
import {Administrator} from "../../shared/models/administratror.model";
import {Renter} from "../../shared/models/renter.model";

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
   * Enregistre le client connecté en localStorage
   * @param client Le client connecté
   */
  public saveRenter(renter: Renter): void {
    localStorage.removeItem('x-auth-renter');
    localStorage.setItem('x-auth-renter', JSON.stringify(renter));
  }

  /**
   * Enregistre l'admin connecté en localStorage
   * @param admin L'administrateur connecté
   */
  public saveAdmin(admin: Administrator): void {
    localStorage.removeItem('x-auth-admin');
    localStorage.setItem('x-auth-admin', JSON.stringify(admin));
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
      client = Client.fromJsonToken(jsonClient);
    }

    return client;
  }

  /**
   * Récupère le loueur connecté depuis le localStorage
   * @returns Le loueur connecté
   */
  public getRenter(): Renter {
    let renter: Renter = new Renter({
      id: -1,
      password: '',
      metropolises: null,
      isAccepted: 0,
      companyName: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: '',
      address: '',
      additionalAddress: '',
      postalCode: '',
      city: '',
      imageLink: ''
    });

    const jsonRenter = JSON.parse(localStorage.getItem('x-auth-renter'));

    if (jsonRenter) {
      renter = Renter.fromJsonToken(jsonRenter);
    }

    return renter;
  }

  /**
   * Récupère l'administrateur connecté depuis le localStorage
   * @returns L'administrateur connecté
   */
  public getAdmin(): Administrator {
    let admin: Administrator = new Administrator({
      id: -1,
      username: '',
      password: ''
    });

    const jsonAdmin = JSON.parse(localStorage.getItem('x-auth-admin'));

    if (jsonAdmin) {
      admin = Administrator.fromJson(jsonAdmin);
    }

    return admin;
  }

  /**
   * Déconnecte un utilisateur en vidant le localStorage
   */
  public logOut(): void {
    localStorage.clear();
  }
}
