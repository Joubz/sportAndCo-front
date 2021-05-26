import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Constants } from './../../../../constants';
import { environment } from './../../../environments/environment';

import {Order} from "../../shared/models/order.model";

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
 * Service de gestion des commandes
 */
export class OrderService {
  /**
   * Point d'entrée de l'API Sport & Co pour les commandes
   */
  orderEndpoint = environment.URL_API + this.constants.API_ENDPOINTS.ORDER;

  /**
   * Import des services nécessaires
   * @param http Service natif d'angular pour la création de requêtes HTTP
   * @param constants Fichier qui contient les constantes du projet
   */
  constructor(private http: HttpClient, private constants: Constants) {}

  /**
   * Récupère la commande
   * @param orderId Identifiant de la commande à récupérer
   * @returns Un observable contenant la commande récupérée
   */
  getOrder(orderId: number): Observable<Order> {
    return this.http
      .get(this.orderEndpoint + '/' + orderId)
      .pipe(map((jsonResponse: any) => Order.fromJson(jsonResponse[0])));
  }

  /**
   * Récupère les commandes selon l'équipment
   * @param equipmentId Identifiant de l'équipement de la commande à récupérer
   * @returns Un observable contenant la commande récupérée
   */
  getOrderByEquipment(equipmentId: number): Observable<Order[]> {
    return this.http.get(
      this.orderEndpoint + '/order-by-equipment/' + equipmentId).pipe(
      map((jsonResponse: any) => {
          const orderList = [];
          jsonResponse.forEach(element => {
            const order: Order = Order.fromJson(element);
            orderList.push(order);
          });
          return orderList;
        }
      )
    );
  }

  /**
   * Récupère les commandes selon l'équipment
   * @param equipmentId Identifiant de l'équipement de la commande à récupérer
   * @returns Un observable contenant la commande récupérée
   */
  getOrderByEquipmentForAvailability(equipmentId: number): Observable<Order[]> {
    return this.http.get(
      this.orderEndpoint + '/order-by-equipment-available/' + equipmentId).pipe(
      map((jsonResponse: any) => {
          const orderList = [];
          jsonResponse.forEach(element => {
            const order: Order = Order.fromJson(element);
            orderList.push(order);
          });
          return orderList;
        }
      )
    );
  }

  /**
   * Récupère les commandes selon le client
   * @param clientId Identifiant du client
   * @returns Un observable contenant les commandes récupérées
   */
  getOrderByClient(clientId: number): Observable<Order[]> {
    return this.http.get(
      this.orderEndpoint + '/order-by-client/' + clientId).pipe(
      map((jsonResponse: any) => {
          const orderList = [];
          jsonResponse.forEach(element => {
            const order: Order = Order.fromJson(element);
            orderList.push(order);
          });
          return orderList;
        }
      )
    );
  }

}
