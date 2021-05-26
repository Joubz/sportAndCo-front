import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Renter } from 'src/app/shared/models/renter.model';
import { Md5 } from 'ts-md5';

import { Constants } from '../../../../constants';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginRenterService {

   /**
    * Point d'entrée de l'API EcoCampus pour la gestion des votes
    */
    renterLoginEndpoint = environment.URL_API + this.constants.API_ENDPOINTS.LOGIN_RENTER;

  /**
   *  Import des services nécessaires
   * @param http Service natif angular pour la création de requête http
   * @param constants fichier qui contient les constante du projet
   */
    constructor(private http: HttpClient, private constants: Constants) { }

    /**
     * 
     * @param renter 
     * @returns 
     */
    authLoginRenter(renter: Renter): Observable<{ renter: Renter, token: string}> {
      const passwordCrypt = Md5.hashStr(renter.password).toString();
      const body = {
        "email": renter.email,
        "password": passwordCrypt
      };

      return this.http.post(this.renterLoginEndpoint, body).pipe(
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

}
