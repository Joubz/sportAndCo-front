import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Client} from "../../shared/models/clientRent.model";
import {Order} from "../../shared/models/order.model";
import {environment} from "../../../environments/environment";

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
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    console.log("constructor");
    console.log(this.router.getCurrentNavigation().extras.state.order.id);
    this.order = this.router.getCurrentNavigation().extras.state.order;
    console.log("order");
    console.log(this.order);

  }

  /**
   * Initialise le composant, récupère l'équipement correspondant et la liste des commandes concernés par l'équipement (pour vérifier si l'équipement est disponible)
   */
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // console.log("Method Implementation");
    console.log("ngOninit");
    console.log(window.history.state.order.equipment);
    console.log(history.state.order.bill);
    console.log("order");
    console.log(this.order);
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
