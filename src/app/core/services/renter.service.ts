import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {Constants} from "../../../../constants";
import {Renter} from "../../shared/models/renter.model";

/**
 * Définit le content-type du header
 */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RenterService {

  /**
   * Point d'entrée de l'API Sport & Co pour les loueurs
   */
  renterEndpoint = environment.URL_API + this.constants.API_ENDPOINTS.RENTER;

  /**
   * Import des services nécessaires
   * @param http Service natif d'angular pour la création de requêtes HTTP
   * @param constants Fichier qui contient les constantes du projet
   */
  constructor(private http: HttpClient, private constants: Constants) {}

  /**
   * Récupère la liste des loueurs non acceptés
   * @returns liste des exemples
   */
  getNotAcceptList(): Observable<Renter[]> {
    return this.http.get(
      this.renterEndpoint + '/not-accept-list').pipe(
      map((jsonResponse: any) => {
          const renterList = [];
          jsonResponse.forEach(element => {
            const renter: Renter = Renter.fromJson(element);
            renterList.push(renter);
          });
          return renterList;
        }
      ));
  }

  /**
   * Accepte un loueur
   * @param renterId id de l'exemple
   * @param newExemple l'exemple modifiée
   * @returns code 200
   */
  acceptRenter(renterId: number, renter: Renter): Observable<any> {
    return this.http.put(
      this.renterEndpoint + '/accept-renter/' + renterId, {renter} , httpOptions);
  }

  /**
   * Fonction de suppression d'un loueur
   * @param renterId id de l'exemple
   * @returns reqûete http delete pour exemple
   */
  deleteRenter(renterId: number, renter: Renter): Observable<any>{
    return this.http.delete(this.renterEndpoint + '/' + renterId + '/' + renter.firstName + '/'
      + renter.lastName + '/' + renter.email + '/' + renter.companyName);
  }
}
