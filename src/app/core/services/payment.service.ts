import { Injectable } from '@angular/core';
import { Constants } from './../../../../constants';
import { environment } from './../../../environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Payment} from "../../shared/models/payment.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Md5} from "ts-md5";


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
            // TODO décrypter avec md5
            paymentList.push(payment);
          });
          return paymentList;
        }
        )
      );
  }

  /**
   * Insère une carte de crédit
   * @param clientId Identifiant du client
   * @returns Un observable contenant la commande récupérée
   */
  addPaymentCard(payment: Payment): Observable<any> {
    payment.cardName =  Md5.hashStr( payment.cardName).toString();
    payment.cardNumber =  Md5.hashStr( payment.cardNumber).toString();
    payment.expirationDate =  Md5.hashStr( payment.expirationDate).toString();
    payment.CVV =  Md5.hashStr( payment.CVV).toString();
    console.log(payment);

    return this.http
      .post(this.paymentEndpoint + '/add-card', {payment}, httpOptions);
  }

}
