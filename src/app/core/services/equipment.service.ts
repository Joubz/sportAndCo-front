import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {Constants} from "../../../../constants";
import {environment} from "../../../environments/environment";

import {Equipment} from "../../shared/models/equipment.model";

/**
 * Définit le content-type du header
 */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

/**
 * Service de gestion Equipement
 */
export class EquipmentService {

  /**
   * Point d'entrée de l'API Sport & Co pour l'équipement
   */
  equipmentEndpoint = environment.URL_API + this.constants.API_ENDPOINTS.EQUIPMENT;

  /**
   * Import des services nécessaires
   * @param http Service natif d'angular pour la création de requêtes HTTP
   * @param constants Fichier qui contient les constantes du projet
   */
  constructor(private http: HttpClient, private constants: Constants) {}

  /**
   * Récupère l'équipement
   * @param equipmentId Identifiant de l'équipement à récupérer
   * @returns Un observable contenant l'équipement récupérée
   */
  getEquipment(equipmentId: number): Observable<Equipment> {
    return this.http
      .get(this.equipmentEndpoint + '/' + equipmentId)
      .pipe(map((jsonResponse: any) => Equipment.fromJson(jsonResponse[0])));
  }

  /**
   * Renvoie la liste des equipements recherchés par l'utilisateur
   * @returns La liste des équipements trouvés, une erreur sinon
   */
  getListEquipment(): Observable<any> {
    return this.http.get(this.equipmentEndpoint + '/list-equipment').pipe(
      map((jsonResponse: any) => {
        const equipmentList = [];
        jsonResponse.forEach(element => {
          const equipment: Equipment = Equipment.fromJson(element);
          equipmentList.push(equipment);
        });
        return equipmentList;
      })
    );
  }

  /**
   * Recherche les équipements
   * @param equipmentName Nom de l'équipement
   * @param startDate Date de début de location
   * @param endDate Date de fin de location
   * @param categoryId Identifiant de la catégorie
   * @param metropolisesId Identifiant de la métropole
   * @returns La liste des équipements trouvés, une erreur sinon
   */
  searchEquipment(equipmentName: string, startDate: string, endDate: string, categoryId: number, metropolisesId: number) {
    return this.http.get(this.equipmentEndpoint + '/search-equipment' + '/' + equipmentName + '/' +
    startDate + '/' + endDate + '/' + categoryId + '/' + metropolisesId).pipe(
      map((jsonResponse: any) => {
        const equipmentList = [];
        jsonResponse.forEach(element => {
          const equipment: Equipment = Equipment.fromJson(element);
          equipmentList.push(equipment);
        });
        return equipmentList;
      })
    );
  }

}
