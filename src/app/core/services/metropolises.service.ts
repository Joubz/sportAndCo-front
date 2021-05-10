import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {Constants} from "../../../../constants";
import {environment} from "../../../environments/environment";

import {Metropolises} from "../../shared/models/metropolises.model";

@Injectable({
  providedIn: 'root'
})

/**
 * Service de gestion des métropoles des loueurs
 */
export class MetropolisesService {

  /**
   * Point d'entrée de l'API Sport & Co pour les métropoles
   */
  metropolisesEndpoint = environment.URL_API + this.constants.API_ENDPOINTS.METROPOLISES;

  /**
   * Import des services nécessaires
   * @param http Service natif d'angular pour la création de requêtes HTTP
   * @param constants Fichier qui contient les constantes du projet
   */
  constructor(private http: HttpClient, private constants: Constants) {}

  /**
   *  Renvoie la liste des métropoles
   * @returns La liste des métropoles trouvés, une erreur sinon
   */
  getListMetropolises(): Observable<any> {
    return this.http.get(this.metropolisesEndpoint + '/list-metropolises').pipe(
      map((jsonResponse: any) => {
        const metropolisesList = [];
        jsonResponse.forEach(element => {
          const metropolises: Metropolises = Metropolises.fromJson(element);
          metropolisesList.push(metropolises);
        });
        return metropolisesList;
      })
    );
  }

}
