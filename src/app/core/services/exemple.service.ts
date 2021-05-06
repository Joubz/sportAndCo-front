import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Constants } from './../../../../constants';
import { environment } from './../../../environments/environment';

import {Exemple} from '../../shared/models/exemple.model';

/**
 * Définit le content-type du header
 */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * Service de gestion Exemple
 */
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
   * Récupère l'exemple
   * @param exempleId Identifiant de l'exemple à récupérer
   * @returns Un observable contenant l'exemple récupérée
   */
  getExemple(exempleId: number): Observable<Exemple> {
    return this.http
      .get(this.exempleEndpoint + '/' + exempleId)
      .pipe(map((jsonResponse: any) => Exemple.fromJson(jsonResponse[0])));
  }

  /**
   * Récupère la liste des exemples
   * @returns liste des exemples
   */
  getListExemple(): Observable<Exemple[]> {
    return this.http.get(
      this.exempleEndpoint + '/list').pipe(
      map((jsonResponse: any) => {
          const exempleList = [];
          jsonResponse.forEach(element => {
            const news: Exemple = Exemple.fromJson(element);
            exempleList.push(news);
          });
          return exempleList;
        }
      )
    );
  }

  /**
   * Envoi les données d'un exemple
   * @param newExemple Objet de la exemple à envoyer
   * @returns Retour Http
   */
  addNews(newExemple: Exemple): Observable<any> {
    return this.http.post(
      this.exempleEndpoint,
      { newExemple },
      httpOptions
    );
  }

  /**
   * Fonction de modification d'un exemple
   * @param exempleId id de l'exemple
   * @param newExemple l'exemple modifiée
   * @returns code 200
   */
  editExemple(exempleId: number, newExemple: Exemple): Observable<any> {
    return this.http.put(
      this.exempleEndpoint + '/' + exempleId,
      {newExemple},
      httpOptions
    );
  }

  /**
   * Fonction de suppression d'un exemple
   * @param exempleId id de l'exemple
   * @returns reqûete http delete pour exemple
   */
  deleteExemple(exempleId: number): Observable<any>{
    return this.http.delete(this.exempleEndpoint + '/' + exempleId);
  }
}
