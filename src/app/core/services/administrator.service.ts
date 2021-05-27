import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {Observable} from "rxjs";
import { Md5 } from 'ts-md5';
import { map } from 'rxjs/operators';

import { Constants } from '../../../../constants';
import {Administrator} from "../../shared/models/administratror.model";


@Injectable({
  providedIn: 'root'
})
/**
 * Service de gestion de l'administrateur
 */
export class AdministratorService {
  /**
   * Point d'entrée de l'API EcoCampus pour la gestion des votes
   */
  adminEndpoint = environment.URL_API + this.constants.API_ENDPOINTS.ADMIN;

  /**
   * Import des services nécessaires
   * @param http Service natif d'angular pour la création de requêtes HTTP
   * @param constants Fichier qui contient les constantes du projet
   */
  constructor(private http: HttpClient, private constants: Constants) { }

  loginAdmin(admin: Administrator): Observable<{ admin: Administrator, token: string }> {
    const passwordCrypt = Md5.hashStr(admin.password).toString();
    const body = {
      "username": admin.username,
      "password": passwordCrypt
    };

    return this.http.post(this.adminEndpoint + '/login-admin', body).pipe(
      map((jsonResponse: any) => {
        return {
          admin: Administrator.fromJson({
            id: jsonResponse.id,
            username: jsonResponse.username,
            password: ''
          }),
          token: jsonResponse.authenticationToken
        };
    }
    ));
  }
}
