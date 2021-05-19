import { Injectable } from '@angular/core';
import { Constants } from './../../../../constants';
import { environment } from './../../../environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Payment} from "../../shared/models/payment.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Md5} from "ts-md5";
import {ReverseMd5} from "reverse-md5";
import * as CryptoJS from 'crypto-js';

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
   * Import des services nécessaires
   * @param http Service natif d'angular pour la création de requêtes HTTP
   * @param constants Fichier qui contient les constantes du projet
   */
  constructor(private http: HttpClient, private constants: Constants) {}

  /**
   * Mot de passe d'encriptage
   */
  private MDP_CRYPTAGE = "ProjetTocMdp";
  /**
   * Point d'entrée de l'API Sport & Co pour la récupération des cartes bancaires
   */
  paymentEndpoint = environment.URL_API + this.constants.API_ENDPOINTS.PAYMENT;

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
            // const payment: Payment = this.decryptPayment(Payment.fromJson(element)); TODO Remplacer la ligne précédente par cette ligne dès que les données seront décryptrées au Back
            paymentList.push(payment);
          });
          return paymentList;
        }
        )
      );
  }

  /**
   * Insère une carte de crédit
   * @param payment Les données de la nouvelle carte
   * @returns Un observable contenant la commande récupérée
   */
  addPaymentCard(payment: Payment): Observable<any> {
    payment.cardName =  CryptoJS.AES.encrypt(payment.cardName.trim(), this.MDP_CRYPTAGE.trim()).toString();
    payment.cardNumber =  CryptoJS.AES.encrypt(payment.cardNumber.trim(), this.MDP_CRYPTAGE.trim()).toString();
    payment.expirationDate =  CryptoJS.AES.encrypt(payment.expirationDate.trim(), this.MDP_CRYPTAGE.trim()).toString();
    payment.CVV =  CryptoJS.AES.encrypt(payment.CVV.trim(), this.MDP_CRYPTAGE.trim()).toString();
    console.log(payment);

    return this.http
      .post(this.paymentEndpoint + '/add-card', {payment}, httpOptions);
  }

  /**
   * @param payment Le paiement qu'on veut décrypter
   * @private
   * @return Le paiement décrypté
   */
  private decryptPayment(payment: Payment): Payment {
    return new Payment(
      {
        id: payment.id,
        cardName: CryptoJS.AES.decrypt(payment.cardName.trim(), this.MDP_CRYPTAGE.trim()),
        cardNumber: CryptoJS.AES.decrypt(payment.cardNumber.trim(), this.MDP_CRYPTAGE.trim()),
        expirationDate: CryptoJS.AES.decrypt(payment.expirationDate.trim(), this.MDP_CRYPTAGE.trim()),
        CVV: CryptoJS.AES.decrypt(payment.CVV.trim(), this.MDP_CRYPTAGE.trim())
      }
    );
  }
}
