import {Component, OnDestroy, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import {ActivatedRoute, Router} from "@angular/router";

import {Equipment} from "../../shared/models/equipment.model";
import {EquipmentService} from "../../core/services/equipment.service";
import {Subscription} from "rxjs";
import {Order} from "../../shared/models/order.model";

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
   * Id de l'équipement bouchonné
   */
  bouchonEquipmentId = 1;

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
   * Constructeur du composant
   * @param equipmentService Service de gestion des éqyipements
   * @param router Service de gestion des routes
   * @param route Service angular de gestion de la route actuelle
   */
  constructor(
    private equipmentService: EquipmentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * Initialise le composant
   */
  ngOnInit(): void {
    this.getEquipmentSub = this.equipmentService.getEquipment(parseInt(this.route.snapshot.paramMap.get('id'), 10)).subscribe(result => {
      this.equipment = result;
      console.log(this.equipment);
    });
  }

  /**
   * Unsubscribe
   */
  ngOnDestroy(): void {
    this.getEquipmentSub?.unsubscribe();
  }

}
