import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {OrderService} from "../../core/services/order.service";
import {Client} from "../../shared/models/clientRent.model";
import {TokenStorageService} from "../../core/services/token-storage.service";
import {Order} from "../../shared/models/order.model";
import {environment} from "../../../environments/environment";

/**
 * Composant de la liste des commandes des clients
 */
@Component({
  selector: 'app-list-client-order',
  templateUrl: './list-client-order.component.html',
  styleUrls: ['./list-client-order.component.css']
})
export class ListClientOrderComponent implements OnInit, OnDestroy{
  /**
   * Permet d'attendre que les commandes soient chargées pour les afficher
   */
  isOrderLoaded: Promise<boolean>;

  /**
   * Subscription au service de récupération des commandes
   */
  orderSub: Subscription;

  /**
   * Client actuellement connecté
   */
  client: Client;

  /**
   * La liste des commandes concernant le client
   */
  orderList: Order[];

  /**
   * url de l'application qui sera passé au HTML de l'image pour chargement de l'image sur le visuel
   */
  urlBasic: string = environment.URL_BASE;

  /**
   * Constructeur du composant
   * @param orderService Service de gestion des commandes
   * @param tokenStorageService Service de gestion des tokens
   */
  constructor(
    private tokenStorageService: TokenStorageService,
    private orderService: OrderService
  ) { }

  /**
   * Initialise le composant, récupère la liste des commandes du client
   */
  ngOnInit(): void {
    this.client = this.tokenStorageService.getClient();
    this.orderSub = this.orderService.getOrderByClient(this.client.id).subscribe(orderList => {
      this.orderList = orderList;
      orderList.forEach(order => {
        if (order.equipment.imageLink2 == null) {
          order.equipment.imageLink2 = "/images/inconnu.png";
        }
        if (order.equipment.imageLink3 == null) {
          order.equipment.imageLink3 = "/images/inconnu.png";
        }
      });
      this.isOrderLoaded = Promise.resolve(true);
    });
  }

  /**
   * Unsubscribe
   */
  ngOnDestroy(): void {
    this.orderSub?.unsubscribe();
  }

}
