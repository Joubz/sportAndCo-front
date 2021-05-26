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


@Injectable({
  providedIn: 'root'
})
export class RenterService {

  /**
   * Point d'entrée de l'API Sport&Co pour la gestion des loueurs
   */
  renterEndpoint = environment.URL_API + this.constants.API_ENDPOINTS.RENTER;

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
}
