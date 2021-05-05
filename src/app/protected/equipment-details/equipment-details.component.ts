import {Component, OnDestroy, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import {ActivatedRoute, Router} from "@angular/router";

import {Equipment} from "../../shared/models/equipment.model";
import {EquipmentService} from "../../core/services/equipment.service";
import {forkJoin, of, Subscription} from "rxjs";
import {Order} from "../../shared/models/order.model";
import {mergeMap} from "rxjs/operators";
import {OrderService} from "../../core/services/order.service";

/**
 * Composant de la page détails d'un équipement
 */
@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.css']
})
export class EquipmentDetailsComponent implements OnInit, OnDestroy {

  /**
   * Permet d'attendre que l'équipement soit chargée pour l'afficher
   */
  equipmentLoaded: Promise<boolean>;

  /**
   * Equipement qui est récupéré du component parent
   */
  equipment: Equipment;

  /**
   * Liste des commandes concernés par l'équipement
   */
  orderListByEquipment: Order[];

  /**
   * Souscription au service de récupération de l'équipement
   */
  getEquipmentSub: Subscription;

  /**
   * url de l'application qui sera passé au HTML de l'image pour chargement de l'image sur le visuel
   */
  urlBasic: string = environment.URL_BASE;

  /**
   * Booleen permettant de savoir si l'équipement est disponible
   */
  isAvailable: boolean;

  /**
   * Nombre de quantité
   */
  quantityAvailable: number;

  // TODO transformer en input quand poblème réglé
  /**
   * Date de début sélectionnée par le client
   */
  startDateSelect: Date;

  /**
   * Date de fin sélectionnée par le client
   */
  endDateSelect: Date;

  /**
   * Constructeur du composant
   * @param equipmentService Service de gestion des éqyipements
   * @param orderService Service de gestion des commandes
   * @param router Service de gestion des routes
   * @param route Service angular de gestion de la route actuelle
   */
  constructor(
    private equipmentService: EquipmentService,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * Initialise le composant, récupère l'équipement correspondant et la liste des commandes concernés par l'équipement (pour vérifier si l'équipement est disponible)
   */
  ngOnInit(): void {
    this.getEquipmentSub = forkJoin([
      this.equipmentService.getEquipment(parseInt(this.route.snapshot.paramMap.get('id'), 10)),
      this.orderService.getOrderByEquipmentForAvailability(parseInt(this.route.snapshot.paramMap.get('id'), 10))
    ]).subscribe(([equipment, listOrder]) => {
      this.equipment = equipment;
      this.orderListByEquipment = listOrder;
      this.quantityAvailable = +this.equipment.availableQuantity;

      this.startDateSelect = new Date();
      this.endDateSelect = new Date();

      this.isEquipmentAvailable();

      this.equipmentLoaded = Promise.resolve(true);
    });
  }

  /**
   * Unsubscribe
   */
  ngOnDestroy(): void {
    this.getEquipmentSub?.unsubscribe();
  }

  /**
   * Fonction qui permet de savoir si un équipement est disponible
   * Compare d'abord les dates, ensuite la quantité
   */
  isEquipmentAvailable(): void {
    this.isAvailable = false;

    if (this.orderListByEquipment.length === 0) {
      this.isAvailable = true;
    }

    this.orderListByEquipment.forEach(order => {
        const startDate = new Date(order.startDate);
        const endDate = new Date(order.finishDate);

        if (!this.isAvailable) {
          if (startDate >= this.startDateSelect || endDate <= this.endDateSelect )
          {
            if (this.quantityAvailable >= (+this.equipment.availableQuantity - +order.quantityRented) && this.quantityAvailable !== 0 &&
              this.quantityAvailable <= +this.equipment.totalQuantity) {
              this.isAvailable = true;
            }
          }
        }
      }
    );
  }

  /**
   * Augmente la quantité, vérifie la disponibilité
   */
  augmentQuantity(): void {
    this.quantityAvailable++;
    this.isEquipmentAvailable();
  }

  /**
   * Augmente la quantité, vérifie la disponibilité
   */
  diminishQuantity(): void {
    if (this.quantityAvailable !== 0) {
      this.quantityAvailable--;
      this.isEquipmentAvailable();
    }
  }


}
