import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Md5} from "ts-md5";
import { map } from 'rxjs/operators';

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
   * @param newClient l'objet client
   * @return Code_200 Le retour HTTP
   */
  createClient(newClient: Client): Observable<any> {
    newClient.password =  Md5.hashStr(newClient.password).toString();
    return this.http.post(this.clientEndpoint + '/create-client', { newClient }, httpOptions);
  }

  /**
   * Fonction pour authentifier un utilisateur depuis l'API Sport&Co
   * @param loginClient Object client du client
   */
  loginClient(loginClient: Client): Observable<any> {
    loginClient.password = Md5.hashStr(loginClient.password).toString();

    return this.http.post(this.clientEndpoint + '/login', {loginClient}, httpOptions).pipe(
      map((jsonResponse: any) => {
          return {
            client: Client.fromJson({
              id: jsonResponse.ID,
              email: jsonResponse.EMAIL
            }),
            token: jsonResponse.authenticationToken
          };
        }
      ));
  }
}
