import {Component, OnDestroy, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import {ActivatedRoute, Router} from "@angular/router";
import {forkJoin, Subscription} from "rxjs";

import {Equipment} from "../../shared/models/equipment.model";
import {EquipmentService} from "../../core/services/equipment.service";
import {Order} from "../../shared/models/order.model";
import {OrderService} from "../../core/services/order.service";


import { DatepickerOptions } from 'ng2-datepicker';
import { getYear } from 'date-fns';
import locale from 'date-fns/locale/en-US';



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
   * Url de retour pour le clic sur le bouton "Retour au tableau" ou les actions sur l'anomalie
   */
  urlBack = this.route.snapshot.queryParamMap.get('from');

  /**
   * Booleen permettant de savoir si l'équipement est disponible
   */
  isAvailable: boolean;

  /**
   * Nombre de quantité voulus par le client
   */
  quantityWanted: number;

  /**
   * Quantité déjà loué
   */
  quantityAvailable: number;

  // TODO transformer en input quand problème réglé
  /**
   * Date de début sélectionnée par le client
   */
  startDateSelect: Date = new Date();

  /**
   * Date de fin sélectionnée par le client
   */
  endDateSelect: Date = new Date();

  /**
   * Vérifie si les dates sélectionnés sont ok
   */
  areDatesOk: boolean;

  /**
   * Options des sélectionneurs de dates
   */
  startDatePickerOptions: DatepickerOptions = {
    placeholder: '',
    format: 'LLLL do yyyy',
    formatTitle: 'LLLL yyyy',
    formatDays: 'EEEEE',
    firstCalendarDay: 1,
    locale,
    position: 'bottom',
    calendarClass: 'datepicker-default',
    scrollBarColor: '#dfe3e9',
    maxDate: new Date()
  };

  /**
   * Options des sélectionneurs de dates
   */
  endDatePickerOptions: DatepickerOptions = {
    placeholder: '',
    format: 'LLLL do yyyy',
    formatTitle: 'LLLL yyyy',
    formatDays: 'EEEEE',
    firstCalendarDay: 1,
    locale,
    position: 'bottom',
    calendarClass: 'datepicker-default',
    scrollBarColor: '#dfe3e9',
    maxDate: new Date(),
  };

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
      this.quantityWanted = 1;
      this.quantityAvailable = this.equipment.totalQuantity;
      this.areDatesOk = true;
      this.startDatePickerOptions.minDate = new Date(this.equipment.endDate);
      this.endDatePickerOptions.minDate = new Date(this.equipment.endDate);

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
    this.quantityAvailable = this.equipment.totalQuantity;

    this.orderListByEquipment.forEach(order => {
        const startDate = new Date(order.startDate);
        const endDate = new Date(order.endDate);
        let dateCorrespondante = false;

        if ( !(this.endDateSelect <= startDate || this.startDateSelect >= endDate) )
        {
          dateCorrespondante = true;
          this.quantityAvailable -= order.quantityRented;
        }

        if (order.statusReturned === false && !dateCorrespondante) {
          this.quantityAvailable -= order.quantityRented;
        }
      });

    if (this.quantityWanted <= this.quantityAvailable ) {
      this.isAvailable = true;
    }
  }

  /**
   * Augmente la quantité, vérifie la disponibilité
   */
  augmentQuantity(): void {
    if (this.quantityWanted < +this.equipment.totalQuantity) {
      this.quantityWanted++;
      this.isEquipmentAvailable();
    }
  }

  /**
   * Augmente la quantité, vérifie la disponibilité
   */
  diminishQuantity(): void {
    if (this.quantityWanted !== 1) {
      this.quantityWanted--;
      this.isEquipmentAvailable();
    }
  }

  /**
   * Méthode pour retourner au tableau des listes
   */
  goBack() {
    // TODO connecter quand la liste sera présente
    // this.router.navigate(['/equipment', this.urlBack]);
  }

  /**
   * Récupère les classes à appliquer aux boutons en fonction du statut de disponibilité
   * @param buttonName Nom du bouton affiché
   * @returns Les classes CSS à appliquer
   */
  getButtonClass(buttonName: string): string {
    switch (buttonName) {
      case 'rent':
        return !this.isAvailable ? 'report disabled' : 'validate';
    }
  }

  /**
   * Fonction qui gère le changement de date
   * @param $event Date de début
   */
  changeStartDate(): void {
    this.areDatesCorrect();
    this.isEquipmentAvailable();
  }

  /**
   * Fonction qui gère le changement de date
   * @param $event Date de fin
   */
  changeEndDate(): void {
    this.areDatesCorrect();
    this.isEquipmentAvailable();
  }

  /**
   * Fonction vérifiant si les dates sélectionnées sont conformes, affiche un message d'erreur sinon
   */
  areDatesCorrect(): void {
    if (this.startDateSelect > this.endDateSelect) {
      this.areDatesOk = false;
    } else {
      this.areDatesOk =  true;
    }
  }

  /**
   * Fonction lançant la demande de location
   */
  rent() {
    if (this.isAvailable && this.areDatesOk) {
      // TODO
    }
  }


}
