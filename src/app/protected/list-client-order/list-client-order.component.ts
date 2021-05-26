import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {OrderService} from "../../core/services/order.service";
import {Client} from "../../shared/models/clientRent.model";
import {TokenStorageService} from "../../core/services/token-storage.service";
import {Order} from "../../shared/models/order.model";

@Component({
  selector: 'app-list-client-order',
  templateUrl: './list-client-order.component.html',
  styleUrls: ['./list-client-order.component.css']
})
export class ListClientOrderComponent implements OnInit, OnDestroy{

  /**
   * Subscription au service de récupération des commandes
   */
  orderSub: Subscription;

  /**
   * Variable d'identification client
   */
  isClient = false;

  /**
   * Client actuellement connecté
   */
  client: Client;

  /**
   * La liste des commandes concernant le client
   */
  orderList: Order[];

  constructor(
    private tokenStorageService: TokenStorageService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.client = this.tokenStorageService.getClient();
    this.orderSub = this.orderService.getOrderByClient(this.client.id).subscribe(orderList => {
      this.orderList = orderList;
    });
  }

  ngOnDestroy(): void {
    this.orderSub?.unsubscribe();
  }

}
