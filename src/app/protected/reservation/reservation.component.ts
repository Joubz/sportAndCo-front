import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Order} from "../../shared/models/order.model";
import {environment} from "../../../environments/environment";

/**
 * Composant de la réservation
 */
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  /**
   * Commande du client
   */
  order: Order;

  /**
   * url de l'application qui sera passé au HTML de l'image pour chargement de l'image sur le visuel
   */
  urlBasic: string = environment.URL_BASE;

  /**
   * Constructeur du composant, récupère la commande que le client veut passer
   * @param router Service de gestion des routes
   * @param activatedRoute Service angular de gestion de la route actuelle
   */
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.order = this.router.getCurrentNavigation().extras.state.order;
  }

  /**
   * Initialise le composant
   */
  ngOnInit(): void {
  }

  /**
   * Redirige vers le détail de l'éauipement
   */
  goToEquipmentDetails(): void {
    this.router.navigate(
      [
        '/equipment/equipment-details',
        this.order.equipment.id,
        this.order.startDate,
        this.order.endDate,
      ],
      { queryParams: { from: 'equipment-list' } }
    );
  }

  /**
   * Redirige vers la page de paiement
   */
  goToPayment() {
    // TODO Mettre le bon URL
    this.router.navigateByUrl('/equipment/payment', { state: {"order": this.order } });
  }
}
