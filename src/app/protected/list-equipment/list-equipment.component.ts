import {Component, OnDestroy, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import {ActivatedRoute, Router} from "@angular/router";
import { firstBy } from 'thenby';

import {EquipmentService} from "../../core/services/equipment.service";
import {OrderService} from "../../core/services/order.service";
import {Equipment} from "../../shared/models/equipment.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-list-equipment',
  templateUrl: './list-equipment.component.html',
  styleUrls: ['./list-equipment.component.css']
})
export class ListEquipmentComponent implements OnInit, OnDestroy {

  /**
   * Permet d'attendre que l'équipement soit chargé pour l'afficher
   */
  listEquipmentLoaded: Promise<boolean>;

  /**
   * Liste des équipements correspondants à la recherche de l'utilisateur
   */
  listEquipment: Equipment[];

  /**
   * Souscription au service de récupération de la liste des équipements
   */
  getListEquipmentSub: Subscription;

  /**
   * url de l'application qui sera passé au HTML de l'image pour chargement de l'image sur le visuel
   */
  urlBasic: string = environment.URL_BASE;

  /**
   * Constructeur du composant
   * @param equipmentService Service de gestion des éqyipements
   * @param orderService Service de gestion des commandes
   * @param router Service de gestion des routes
   * @param route Service angular de gestion de la route actuelle
   */
  constructor(private equipmentService: EquipmentService,
              private orderService: OrderService,
              private router: Router,
              private route: ActivatedRoute) {}

  /**
   * Initialise le composant, récupère la liste des équipements correspondant à la recherche
   */
  ngOnInit(): void {
    this.getListEquipmentSub = this.equipmentService.getListEquipment().subscribe(
      (listEquipment) => {
        this.listEquipment = listEquipment;
        this.listEquipment.sort((a, b) => a.name.localeCompare(b.name));
        this.listEquipmentLoaded = Promise.resolve(true);
      });
  }

  /**
   * Trie la liste des équipements par ordre de prix ascendant
   */
  sortListEquipmentsByPriceAscendant(): void {
    /*this.listEquipment = this.listEquipment.sort((a, b) => a.price.toString().localeCompare(b.price.toString()));*/
    this.listEquipment.sort(
      firstBy(function(v1: Equipment, v2: Equipment) { return v1.price - v2.price; }));
    /*this.listEquipment = this.listEquipment.sort((a, b) => a.price.toString().PendingQuantity - b.price.toString().PendingQuantity);*/

  }

  /**
   * Trie la liste des équipements par ordre de prix ascendant
   */
  sortListEquipmentsByPriceDescendant(): void {
    /*this.listEquipment = this.listEquipment.sort((a, b) => a.price.toString().localeCompare(b.price.toString()));*/
    this.listEquipment.sort(
      firstBy(function(v1: Equipment, v2: Equipment) { return v2.price - v1.price; }));
    /*this.listEquipment = this.listEquipment.sort((a, b) => a.price.toString().PendingQuantity - b.price.toString().PendingQuantity);*/

  }

  /**
   * Unsubscribe
   */
  ngOnDestroy(): void {
    this.getListEquipmentSub?.unsubscribe();
  }

  /**
   * Redirige vers le détail de l'éauipement
   * @param id identifiant de l'équipement
   */
  goToEquipmentDetails(id: number): void {
    this.router.navigate(['/equipment/equipment-details', id], { queryParams: { from: 'equipment-list' } });
  }

}
