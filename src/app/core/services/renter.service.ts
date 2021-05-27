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
   * Récupère la liste des loueurs
   * @returns liste des loueurs
   */
  getRenterList(): Observable<Renter[]> {
    return this.http.get(
      this.renterEndpoint + '/list').pipe(
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
   * Récupère la liste des loueurs non acceptés
   * @returns liste des loueurs
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
   * @param renterId id du loueur
   * @param newExemple le loueur modifiée
   * @returns code 200
   */
  acceptRenter(renterId: number, renter: Renter): Observable<any> {
    return this.http.put(
      this.renterEndpoint + '/accept-renter/' + renterId, {renter} , httpOptions);
  }

  /**
   * Fonction de suppression d'un loueur
   * @param renterId id du loueur
   * @returns reqûete http delete pour loueur
   */
  deleteRenter(renterId: number, renter: Renter): Observable<any>{
    return this.http.delete(this.renterEndpoint + '/' + renterId + '/' + renter.firstName + '/'
      + renter.lastName + '/' + renter.email + '/' + renter.companyName);
  }

  /**
   * Récupère le loueur associé à l'équipement
   * @param equipmentId Identifiant de l'équipement
   * @returns Un observable contenant le loueur récupéré
   */
  getRenterByEquipment(equipmentId: number): Observable<Renter> {
    return this.http
      .get(this.renterEndpoint + '/get-by-equipment/' + equipmentId)
      .pipe(map((jsonResponse: any) => Renter.fromJson(jsonResponse[0])));
  }

}