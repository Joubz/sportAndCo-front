import {Component, OnDestroy, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import {ActivatedRoute, Router} from "@angular/router";
import {Equipment} from "../../shared/models/equipment.model";
import {Client} from "../../shared/models/clientRent.model";
import {Payment} from "../../shared/models/payment.model";
import {EquipmentService} from "../../core/services/equipment.service";
import {PaymentService} from "../../core/services/payment.service";
import {OrderService} from "../../core/services/order.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {

  /**
   * Equipement qui est récupéré du component parent
   */
  equipment: Equipment;

  /**
   * Données du client qui visite la page et souhaite louer le produit
   */
  client: Client;

  /**
   * Données bancaire, nécessaire à l'achat, du client qui visite la page et souhaite louer le produit
   */
  payment: Payment;

  /**
   * Fonction permettant de récupérer les données bancaire du client
   */
  private getPaymentCard: Observable<Payment>;

  /**
   * Souscription au service de récupération de la carte de paiement
   */
  getPaymentCardSub: Subscription;

  /**
   * Liste des Données bancaire du client
   */
  listPayment: Payment[];




  constructor(
    private paymentService: PaymentService,
    private equipmentService: EquipmentService,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPaymentCardSub = this.paymentService.getPaymentCard(1)
      .subscribe(
        paymentList => {
          this.listPayment = paymentList;}
      ) ;
  }

  ngOnDestroy(): void {
  }

}
