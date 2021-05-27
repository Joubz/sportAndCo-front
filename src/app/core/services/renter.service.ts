import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Md5} from "ts-md5";

import { Constants } from '../../../../constants';
import { environment } from '../../../environments/environment';

import { Renter } from './../../shared/models/renter.model';


/**
 * Définit le content-type du header
 */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

/**
 * Service de gestion des loueur
 */
@Injectable({
  providedIn: 'root'
})
export class RenterService {
  /**
   * Point d'entrée de l'API Sport&Co pour la gestion des loueurs
   */
  renterEndpoint = environment.URL_API + this.constants.API_ENDPOINTS.RENTER;

  /**
   * Import des services nécessaires
   * @param http Service natif d'angular pour la création de requêtes HTTP
   * @param constants Fichier qui contient les constantes du projet
   */
  constructor(private http: HttpClient, private constants: Constants) { }

  /**
   * Ajoute un loueur depuis l'API Sport&Co
   * @param newRenter l'objet renter
   * @return Code_200 Le retour HTTP
   */
  createRenter(newRenter: Renter): Observable<any> {
    newRenter.password =  Md5.hashStr(newRenter.password).toString();
    return this.http.post(this.renterEndpoint + '/create-renter', { newRenter }, httpOptions);
  }

  /**
   * Fonction pour authentifier un loueur depuis l'API Sport&Co
   * @param renter L'objet loueur
   * @returns renter le loueur trouvé
   */
  loginRenter(renter: Renter): Observable<{ renter: Renter, token: string}> {
    const passwordCrypt = Md5.hashStr(renter.password).toString();
    const body = {
      "email": renter.email,
      "password": passwordCrypt
    };

    return this.http.post(this.renterEndpoint + '/login', body).pipe(
      map((jsonResponse: any) => {
          return {
            renter: Renter.fromJson({
              id: jsonResponse.ID,
              email: jsonResponse.EMAIL
            }),
            token: jsonResponse.renterAuthentificationToken
          };
        }
      ));
  }

  /**
   * Renvoie la liste des mails des loueurs
   * @return mailList la liste des mails trouvés, une erreur sinon
   */
  getListMailRenter(): Observable<string[]> {
    return this.http.get(this.renterEndpoint + '/list-mail').pipe(
      map((jsonResponse: any) => {
        const mailList = [];
        jsonResponse.forEach(element => {
          const mail = element.EMAIL;
          mailList.push(mail);
        });
        return mailList;
      })
    );
  }

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
