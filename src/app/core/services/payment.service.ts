import { Injectable } from '@angular/core';
import { Constants } from './../../../../constants';
import { environment } from './../../../environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Payment} from "../../shared/models/payment.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
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
export class PaymentService {
  /**
   * Point d'entrée de l'API Sport & Co pour la récupération des cartes bancaires
   */
  paymentEndpoint = environment.URL_API + this.constants.API_ENDPOINTS.PAYMENT;

  /**
   * Import des services nécessaires
   * @param http Service natif d'angular pour la création de requêtes HTTP
   * @param constants Fichier qui contient les constantes du projet
   */
  constructor(private http: HttpClient, private constants: Constants) {}

  /**
   * Récupère la commande
   * @param clientId Identifiant du client qui souhaite louer
   * @returns Un observable contenant la commande récupérée
   */
  getPaymentCard(clientId: number): Observable<Payment[]> {
    return this.http
      .get(this.paymentEndpoint + '/' + clientId)
      .pipe(map((jsonResponse: any) => {
          const paymentList = [];
          jsonResponse.forEach(element => {
            const payment: Payment = Payment.fromJson(element);
            paymentList.push(payment);
          });
          return paymentList;
        }
        )
      );
  }
}
