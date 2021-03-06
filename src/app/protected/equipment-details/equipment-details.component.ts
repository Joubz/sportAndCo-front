import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';

import { Equipment } from '../../shared/models/equipment.model';
import { EquipmentService } from '../../core/services/equipment.service';
import { Order } from '../../shared/models/order.model';
import { OrderService } from '../../core/services/order.service';

import { DatepickerOptions } from 'ng2-datepicker';
import locale from 'date-fns/locale/en-US';
import { Client } from '../../shared/models/clientRent.model';
import { Location } from '@angular/common';
import {Bill} from "../../shared/models/bill.model";
import {TokenStorageService} from "../../core/services/token-storage.service";

/**
 * Composant de la page détail d'un équipement
 */
@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.css'],
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
   * Données du client qui visite la page et souhaite louer le produit
   */
  client: Client;

  /**
   * Booleen indiquand si le client est connecté ou non
   */
  isClientConnected: boolean;

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
   * Nombre de quantité voulus par le client
   */
  quantityWanted: number;

  /**
   * Quantité déjà loué
   */
  quantityAvailable: number;

  /**
   * Date de début sélectionnée par le client
   */
  startDateSelectString = this.route.snapshot.paramMap.get('startDate');

  /**
   * Date de fin sélectionnée par le client
   */
  endDateSelectString = this.route.snapshot.paramMap.get('endDate');

  /**
   * Date de début sélectionnée par le client
   */
  startDateSelect: Date;

  /**
   * Date de fin sélectionnée par le client
   */
  endDateSelect: Date;

  /**
   * Date du jour
   */
  todayDate = new Date();

  /**
   * Vérifie si les dates sélectionnées sont ok
   */
  areDatesOk: boolean;

  /**
   * Booleen indiquant si un produit est disponible à la vente
   */
  isEquipmentStillAvailable: boolean;

  /**
   * Message d'erreur quand la quantité voulue n'est pas disponible
   */
  errorMessageQuantity =
    "Erreur : Ce produit n'est pas disponible à la location";

  /**
   * Message d'erreur sur le choix des dates
   */
  errorMessageDate =
    'Erreur : La date de fin ne peux être inférieur à la date de début';

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
    scrollBarColor: '#dfe3e9'
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
    scrollBarColor: '#dfe3e9'
  };

  /**
   * Constructeur du composant
   * @param equipmentService Service de gestion des éqyipements
   * @param orderService Service de gestion des commandes
   * @param router Service de gestion des routes
   * @param route Service angular de gestion de la route actuelle
   * @param tokenStorageService Service de gestion des tokens
   */
  constructor(
    private equipmentService: EquipmentService,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private tokenStorageService: TokenStorageService
  ) {}

  /**
   * Initialise le composant, récupère l'équipement correspondant et la liste des commandes concernés par l'équipement (pour vérifier si l'équipement est disponible)
   */
  ngOnInit(): void {
    this.getEquipmentSub = forkJoin([
      this.equipmentService.getEquipment(
        parseInt(this.route.snapshot.paramMap.get('id'), 10)
      ),
      this.orderService.getOrderByEquipmentForAvailability(
        parseInt(this.route.snapshot.paramMap.get('id'), 10)
      ),
    ]).subscribe(([equipment, listOrder]) => {
      this.equipment = equipment;
      this.orderListByEquipment = listOrder;

      this.quantityWanted = 1;
      this.quantityAvailable = this.equipment.totalQuantity;

      this.startDateSelect = new Date(this.startDateSelectString);
      this.endDateSelect = new Date(this.endDateSelectString);

      this.todayDate.setDate(this.todayDate.getDate() - 1);
      this.startDatePickerOptions.maxDate = this.todayDate;
      this.endDatePickerOptions.maxDate = this.todayDate;
      this.areDatesOk = true;
      this.startDatePickerOptions.minDate = new Date(this.equipment.endDate);
      this.endDatePickerOptions.minDate = new Date(this.equipment.endDate);

      if (new Date(this.equipment.endDate) < new Date()) {
        this.isEquipmentStillAvailable = false;
      } else {
        this.isEquipmentStillAvailable = true;
      }

      this.isEquipmentAvailable();

      this.isClientConnected = this.tokenStorageService.getClient().id !== -1;
      if (this.isClientConnected){
        this.client = this.tokenStorageService.getClient();
      }

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
   * Compare d'abord les dates et le status puis ensuite la quantité
   */
  isEquipmentAvailable(): void {
    this.isAvailable = false;

    if (this.isEquipmentStillAvailable) {
      this.quantityAvailable = this.equipment.totalQuantity;

      this.orderListByEquipment.forEach((order) => {
        const startDate = new Date(order.startDate);
        const endDate = new Date(order.endDate);
        let dateCorrespondante = false;

        if (
          !(this.endDateSelect <= startDate || this.startDateSelect >= endDate)
        ) {
          dateCorrespondante = true;
          this.quantityAvailable -= order.quantityRented;
        }

        if (order.statusReturned === false && !dateCorrespondante) {
          this.quantityAvailable -= order.quantityRented;
        }
      });

      if (this.quantityWanted <= this.quantityAvailable) {
        this.isAvailable = true;
      }
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
   * Diminue la quantité, vérifie la disponibilité
   */
  diminishQuantity(): void {
    if (this.quantityWanted !== 1) {
      this.quantityWanted--;
      this.isEquipmentAvailable();
    }
  }

  /**
   * Fonction qui gère le changement de date
   */
  changeStartDate(): void {
    this.areDatesCorrect();
    this.isEquipmentAvailable();
  }

  /**
   * Fonction qui gère le changement de date
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
      this.areDatesOk = true;
    }
  }

  /**
   * Méthode pour retourner au tableau des listes
   */
  goBack() {
    this.location.back();
  }

  /**
   * Récupère les classes à appliquer aux boutons en fonction du statut de disponibilité
   * @param buttonName Nom du bouton affiché
   * @returns Les classes CSS à appliquer
   */
  getButtonClass(buttonName: string): string {
    switch (buttonName) {
      case 'rent':
        return !this.isAvailable ? 'disabled' : 'common';
    }
  }

  /**
   * Fonction qui formate la date en année-mois-jour
   * @param date Date passée en paramètres
   */
  formatDate(date: Date): string {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  /**
   * Fonction lançant la demande de location
   */
  rentEquipment() {
    if (this.isAvailable && this.areDatesOk && this.isEquipmentStillAvailable) {

      if (!this.isClientConnected) {
        this.router.navigate(
          ['/client-login'],
          { queryParams: { from: 'equipment-detail' +  this.route.snapshot.paramMap.get('id') + '/' +
              this.startDateSelectString + '/' + this.endDateSelectString } }
        );
      } else {
        const order: Order = new Order({
            id: -1,
            client: this.client,
            equipment: this.equipment,
            bill: new Bill({
              id: -1,
              description: "",
              billDate: this.formatDate(new Date()),
              billPrice: this.quantityWanted * this.equipment.price
            }),
            startDate: this.formatDate(this.startDateSelect),
            endDate: this.formatDate(this.endDateSelect),
            rentDate: this.formatDate(new Date()),
            statusReturned: 0,
            quantityRented: this.quantityWanted
          }
        );

        this.router.navigateByUrl('/equipment/reservation', { state: {"order": order } });
      }

    }
  }

}
