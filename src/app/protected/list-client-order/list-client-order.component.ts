import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {OrderService} from "../../core/services/order.service";
import {Client} from "../../shared/models/clientRent.model";
import {TokenStorageService} from "../../core/services/token-storage.service";
import {Order} from "../../shared/models/order.model";
import {environment} from "../../../environments/environment";
import {RenterService} from "../../core/services/renter.service";
import {CategoryService} from "../../core/services/category.service";

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
   * Subscription au service de récupération du loueur
   */
  renterSub: Subscription;

  /**
   * Subscription au service de récupération de la catégorie
   */
  categorySub: Subscription;

  /**
   * Client actuellement connecté
   */
  client: Client;

  /**
   * La liste des commandes concernant le client
   */
  orderList: Order[];

  /**
   * Permet d'attendre que les commandes soient chargées pour les afficher
   */
  isOrderLoaded: Promise<boolean>;

  /**
   * url de l'application qui sera passé au HTML de l'image pour chargement de l'image sur le visuel
   */
  urlBasic: string = environment.URL_BASE;

  constructor(
    private tokenStorageService: TokenStorageService,
    private orderService: OrderService,
    private renterService: RenterService,
    private categoryService: CategoryService
  ) { }

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

  ngOnDestroy(): void {
    this.orderSub?.unsubscribe();
  }

}
