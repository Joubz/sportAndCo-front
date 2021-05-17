import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {Constants} from "../../../../constants";
import {environment} from "../../../environments/environment";

import {Category} from "../../shared/models/category.model";

@Injectable({
  providedIn: 'root'
})

/**
 * Service de gestion des catégories des équipements
 */
export class CategoryService {

  /**
   * Point d'entrée de l'API Sport & Co pour les catégories
   */
  categoryEndpoint = environment.URL_API + this.constants.API_ENDPOINTS.CATEGORY;

  /**
   * Import des services nécessaires
   * @param http Service natif d'angular pour la création de requêtes HTTP
   * @param constants Fichier qui contient les constantes du projet
   */
  constructor(private http: HttpClient, private constants: Constants) {}

  /**
   *  Renvoie la liste des catégories
   * @returns La liste des catégories trouvés, une erreur sinon
   */
  getListCategory(): Observable<any> {
    return this.http.get(this.categoryEndpoint + '/list-category').pipe(
      map((jsonResponse: any) => {
        const categoryList = [];
        jsonResponse.forEach(element => {
          const category: Category = Category.fromJson(element);
          categoryList.push(category);
        });
        return categoryList;
      })
    );
  }

}
