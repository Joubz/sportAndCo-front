import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Md5} from "ts-md5";

import { Constants } from '../../../../constants';
import { environment } from '../../../environments/environment';

import {Client} from "../../shared/models/clientRent.model";

/**
 * Définit le content-type du header
 */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

/**
 * Service de gestion de l'administrateur
 */
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  /**
   * Point d'entrée de l'API EcoCampus pour la gestion des votes
   */
  clientEndpoint = environment.URL_API + this.constants.API_ENDPOINTS.CLIENT;

  /**
   * Import des services nécessaires
   * @param http Service natif d'angular pour la création de requêtes HTTP
   * @param constants Fichier qui contient les constantes du projet
   */
  constructor(private http: HttpClient, private constants: Constants) { }

  /**
   * Ajoute un client depuis l'API Sport&Co
   * @param client l'objet client
   */
  createClient(client: Client): Observable<any> {
    const password =  Md5.hashStr(client.password).toString();
    const body = {
      "newClient": {
        "password": password,
        "firstName": client.firstName,
        "lastName": client.lastName,
        "email": client.email,
        "phone": client.phone,
        "birthDate": client.birthDate,
        "address": client.address,
        "additionalAddress": client.additionalAddress,
        "postalCode": client.postalCode,
        "city": client.city
      }
    };

    return this.http.post(this.clientEndpoint, { body }, httpOptions);
  }
}
