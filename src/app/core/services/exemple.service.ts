import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Constants } from './../../../../constants';
import { environment } from './../../../environments/environment';

import {Exemple} from '../../shared/models/exemple.model';

@Injectable({
  providedIn: 'root'
})
export class ExempleService {
  /**
   * Point d'entrée de l'API Sport & Co pour l'exemple
   */
  exempleEndpoint = environment.URL_API + this.constants.API_ENDPOINTS.EXEMPLE;

  /**
   * Import des services nécessaires
   * @param http Service natif d'angular pour la création de requêtes HTTP
   * @param constants Fichier qui contient les constantes du projet
   */
  constructor(private http: HttpClient, private constants: Constants) {}

  /**
   * Récupère l'exemple'
   * @param id Identifiant de l'exemple à récupérer
   * @returns Un observable contenant l'exemple récupérée
   */
  getExemple(id: number): Observable<Exemple> {
    return this.http
      .get(this.exempleEndpoint + '/' + id)
      .pipe(map((jsonResponse: any) => Exemple.fromJson(jsonResponse[0])));
  }
}
