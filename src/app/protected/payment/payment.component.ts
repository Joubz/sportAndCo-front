import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Equipment} from "../../shared/models/equipment.model";
import {Client} from "../../shared/models/clientRent.model";
import {Payment} from "../../shared/models/payment.model";
import {EquipmentService} from "../../core/services/equipment.service";
import {PaymentService} from "../../core/services/payment.service";
import {OrderService} from "../../core/services/order.service";
import {forkJoin, Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Order} from "../../shared/models/order.model";
import {TokenStorageService} from "../../core/services/token-storage.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {

  /**
   * Boolean pour afficher le formulaire d'ajout d'une carte
   */
  addCardBoolean: boolean;

  /**
   * Données bancaire, nécessaire à l'achat, du client qui visite la page et souhaite louer le produit
   */
  payment: Payment;

  /**
   * Souscription au service de récupération de la carte de paiement
   */
  getPaymentCardSub: Subscription;

  /**
   * Liste des Données bancaire du client
   */
  listPayment: Payment[];

  /**
   * Données du client qui visite la page et souhaite louer le produit
   */
  client: Client;

  /**
   * Booleen indiquand si le client est connecté ou non
   */
  isClientConnected: boolean;

  /**
   * La méthode de paiement sélectionné
   */
  paymentSelectedName = "";

  /**
   * Indique si une carte est sélectionnée
   */
  isPaymentSelected: boolean;

  /**
   * Message d'erreur du payment
   */
  errorMessagePayment: string;

  /**
   * Boolean pour décider si on affiche le formulaire ou pas
   */
  addCard: boolean;

  /**
   * Formulaire d'ajout d'une carte
   */
  cardForm: FormGroup;

  /**
   * Regex pour les numéros
   */
  numberRegEx = "^[0-9]*$";

  /**
   * Boolean de la soumission du formulaire
   */
  isCardSubmit: boolean;

  /**
   * Message d'erreur pour le numéro de la carte
   */
  messageErrorCardNumber: string;

  /**
   * Message d'erreur pour le cvv
   */
  messageErrorCVV: string;

  /**
   * Message d'erreur pour le nom
   */
  messageErrorName: string;

  /**
   * Message d'erreur pour le nom
   */
  messageExpirationDate: string;

  /**
   * Booleen qui vérifie la confirmité de la date
   */
  isExpirationDateOk: boolean;

  /**
   * Booleen qui vérifie que la date à été sélectionée au moins une fois
   */
  dateIsSelected: boolean;

  /**
   * Message de bouton ajouter une carte ou ne pas ajouter une carte
   */
  showHideForm: string;

  /**
   * Booléan liste vide ou pas
   */
  listIsEmpty: boolean;

  /**
   * Commande du client
   */
  order: Order;

  /**
   * Constructeur du composant
   * @param paymentService Service de gestion de paiement
   * @param equipmentService Service de gestion de l'équipment
   * @param orderService Service de gestion la commande
   * @param router Service de gestion des routes
   * @param route Service de gestion des routes
   * @param tokenStorageService Service de gestion des tokens
   */
  constructor(
    private paymentService: PaymentService,
    private equipmentService: EquipmentService,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService
  ) {
    this.order = this.router.getCurrentNavigation().extras.state.order;
  }

  /**
   * Initialise le composant
   */
  ngOnInit(): void {
    this.getPaymentCardSub = this.paymentService.getPaymentCard(this.order.client.id)
      .subscribe(
        paymentList => {
          this.listPayment = paymentList;
          if (this.listPayment.length === 0) {
            this.listIsEmpty = true;
          }
        });
    this.initForm();
    this.isClientConnected = this.tokenStorageService.getClient().id !== -1;
    if (this.isClientConnected){
      this.client = this.tokenStorageService.getClient();
    }
    this.isPaymentSelected = false;
    this.isCardSubmit = false;
    this.addCardBoolean = false;
    this.isExpirationDateOk =  true;
    this.dateIsSelected = false;
    this.showHideForm = "Ajouter une carte";
  }

  /**
   * Permet de retourner les controls du formulaire de facilement
   */
  get formControls() {
    return this.cardForm.controls;
  }

  /**
   * Unsubscribe la souscription
   */
  ngOnDestroy(): void {
    this.getPaymentCardSub.unsubscribe();
  }

  /**
   *
   * @param payment la carte de paiement contenue par la ligne du tableau
   */
  selectMethod(payment: Payment): void{
    this.paymentSelectedName = payment.cardName;
    this.isPaymentSelected = true;
  }

  /**
   * Initialiser le formulaire
   */
  initForm() {
    this.cardForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.pattern(this.numberRegEx),  Validators.minLength(16), Validators.maxLength(16)]],
      name: ['', Validators.required],
      expirationDate: [new Date()],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.numberRegEx), Validators.maxLength(3)]]
    });
  }

  /**
   * Détection des erreurs
   */
  errorDetection(formField: string): boolean {
    switch (formField) {
      case 'cardNumber' : {
        if (this.formControls.cardNumber.invalid && (this.formControls.cardNumber.dirty || this.formControls.cardNumber.touched || this.isCardSubmit)) {
          if (this.formControls.cardNumber.errors.required) {
            this.messageErrorCardNumber = "Le champ doit être rempli";
            return true;
          } else if (this.formControls.cardNumber.errors.maxlength || this.formControls.cardNumber.errors.minlength) {
            this.messageErrorCardNumber = "Le champ doit être d'une longueur de 16 caractères.";
            return true;
          } else if (this.formControls.cardNumber.errors.pattern) {
            this.messageErrorCardNumber = "Ce champ peut contenir uniquement des chiffres.";
            return true;
          }
        }
        break;
      }
      case 'name' : {
        if (this.formControls.name.invalid && (this.formControls.name.dirty || this.formControls.name.touched || this.isCardSubmit)) {
          if (this.formControls.name.errors.required) {
            this.messageErrorName = "Le champ doit être rempli";
            return true;
          }
        }
        break;
      }
      case 'expirationDate' : {
        if (this.formControls.expirationDate.invalid && (this.formControls.expirationDate.dirty || this.formControls.expirationDate.touched || this.isCardSubmit) || !this.isExpirationDateOk) {
          if (!this.isExpirationDateOk) {
            this.messageExpirationDate = "La date ne peut être inférieur à la date actuelle";
            return true;
          }
        }
        break;
      }
      case 'cvv' : {
        if (this.formControls.cvv.invalid && (this.formControls.cvv.dirty || this.formControls.cvv.touched || this.isCardSubmit)) {
          if (this.formControls.cvv.errors.required) {
            this.messageErrorCVV = "Le champ doit être rempli";
            return true;
          } else if (this.formControls.cvv.errors.maxlength || this.formControls.cvv.errors.minlength) {
            this.messageErrorCVV = "Le champ doit être d'une longueur de 3 caractères.";
            return true;
          } else if (this.formControls.cvv.errors.pattern) {
            this.messageErrorCVV = "Ce champ peut contenir uniquement des chiffres.";
            return true;
          }
        }
        break;
      }
    }
  }

  /**
   * Récupération du nombre de caractères écrits pour le numéro de carte
   */
  get cardNumberChars(): number{
    return this.formControls.cardNumber.value?.length || 0;
  }

  /**
   * Récupération du nombre de caractères écrits pour le CVV
   */
  get cardCvvChars(): number{
    return this.formControls.cvv.value?.length || 0;
  }

  /**
   * Vérifie que la date est correcte
   */
  isExpirationDateCorrect(): void {
    if (!this.dateIsSelected) {
      this.dateIsSelected = true;
    }

    this.isExpirationDateOk = !(this.formControls.expirationDate.value < this.formatDate(new Date()));
  }

  /**
   * Fonction qui formate la date en année-mois-jour
   * @param date Date passée en paramètres
   */
  formatDate(date: Date): string {
    let month = '' + (date.getMonth() + 1);
    const year = date.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }

    return [year, month].join('-');
  }

  /**
   * Soumet le formuliaire
   */
  onSubmitFormAddPayment() {
    this.isCardSubmit = true;
    if (this.cardForm.valid && this.isExpirationDateOk) {
      if (!this.dateIsSelected) {
        this.cardForm.controls.expirationDate.setValue(this.formatDate(this.cardForm.controls.expirationDate.value));
      }
      const formValue = this.cardForm.value;
      this.payment = new Payment({
        id: -1,
        cardName: formValue.name,
        cardNumber: formValue.cardNumber,
        expirationDate: formValue.expirationDate,
        CVV: formValue.cvv
      });
      this.payment.client = this.client;

      this.paymentService.addPaymentCard(this.payment).subscribe( res => {
          this.paymentService.getPaymentCard(this.order.client.id).subscribe(listPayement => {
            this.listPayment = listPayement;
            this.listIsEmpty = false;
            this.cardForm.reset();
            this.addCardBoolean = false;
          });
      });
    }
  }

  /**
   * Changer le boolean pour afficher ou faire disparaître le formulaire d'ajout d'une carte
   */
  changeCardBoolean() {
    if (this.addCardBoolean){
      this.addCardBoolean = false;
      this.showHideForm = "Ajouter une carte";
    } else if (!this.addCardBoolean){
      this.addCardBoolean = true;
      this.showHideForm = "Ne pas ajouter une carte";
    }
  }

  /**
   * Enregistre la commande et le paiement associée à celle-ci
   */
  payEquipment(){
    if (!this.isPaymentSelected) {
      this.errorMessagePayment = "Erreur : Veuillez sélectionné un moyen de paiement.";
    } else {
      this.errorMessagePayment = "";
      if (!this.isClientConnected) {
        this.router.navigate(['/client-login']);
      } else {

        this.order.bill.description = this.order.client.address + " " + this.order.client.additionalAddress + " " + this.order.client.postalCode + " " + this.order.client.city;
        this.orderService.addPaymentOrder(this.order).subscribe(result => {
          this.router.navigate(['/equipment/confirmation']);
        });
      }
    }
  }

  /**
   * Redirige vers la réservation
   */
  goToReservation(): void {
    this.router.navigateByUrl('/equipment/reservation', { state: {"order": this.order } });
  }

}
