import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Equipment} from "../../shared/models/equipment.model";
import {Client} from "../../shared/models/clientRent.model";
import {Payment} from "../../shared/models/payment.model";
import {EquipmentService} from "../../core/services/equipment.service";
import {PaymentService} from "../../core/services/payment.service";
import {OrderService} from "../../core/services/order.service";
import {Observable, Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  // TODO Regerder le décryptage aussi, a mettre dans le service également

  /**
   * Equipement qui est récupéré du component parent
   */
  equipment: Equipment;

  /**
   * Données du client qui visite la page et souhaite louer le produit
   */
  client: Client;

  /**
   * Données bancaire, nécessaire à l'achat, du client qui visite la page et souhaite louer le produit
   */
  payment: Payment;

  /**
   * Fonction permettant de récupérer les données bancaire du client
   */
  private getPaymentCard: Observable<Payment>;

  /**
   * Souscription au service de récupération de la carte de paiement
   */
  getPaymentCardSub: Subscription;

  /**
   * Liste des Données bancaire du client
   */
  listPayment: Payment[];

  /**
   * Liste des Données bancaire du client
   */
  table: HTMLTableRowElement;

  /**
   * La méthode de paiement sélectionné
   */
  paymentSelectedName = "";

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
   * Regex pour les lettres
   */
  caracterRegEx = "^[A-Z]*$";

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
   * Message de bouton ajouter une carte ou ne pas ajouter une carte
   */
  showHideForm: string;

  /**
   * Constructeur du composant
   * @param paymentService Service de gestion de paiement
   * @param equipmentService Service de gestion de l'équipment
   * @param orderService Service de gestion la commande
   * @param router Service de gestion des routes
   * @param route Service de gestion des routes
   */
  constructor(
    private paymentService: PaymentService,
    private equipmentService: EquipmentService,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getPaymentCardSub = this.paymentService.getPaymentCard(1)
      .subscribe(
        paymentList => {
          this.listPayment = paymentList; }
      ) ;
    this.initForm();
    this.isCardSubmit = false;
    this.addCardBoolean = false;
    this.showHideForm = "Ajouter une arte";
  }



  /**
   * Permet de retourner les controls du formulaire de facilement
   */
  get formControls() {
    return this.cardForm.controls;
  }

  /**
   * Destroy
   */
  ngOnDestroy(): void {
  }

  /**
   *
   * @param payment la carte de paiement contenue par la ligne du tableau
   */
  selectMethod(payment: Payment): void{
    this.paymentSelectedName = payment.cardName;
  }

  /**
   * Initialiser le formulaire
   */
  initForm() {
    this.cardForm = this.formBuilder.group({
      // TODO vérifier qu'ils soient des chiffres et pas des caracteres
      cardNumber: ['', [Validators.required, Validators.pattern(this.numberRegEx),  Validators.minLength(16), Validators.maxLength(16)]],
      name: ['', Validators.required],
      expirationDate: [new Date(), [Validators.required]],
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
      case 'name' : {
        if (this.formControls.name.invalid && (this.formControls.name.dirty || this.formControls.name.touched || this.isCardSubmit)) {
          if (this.formControls.name.errors.required) {
            this.messageErrorName = "Le champ doit être rempli";
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
   * Soumet le formuliaire
   */
  onSubmitForm() {
    this.isCardSubmit = true;
    if (this.cardForm.valid) {
      const formValue = this.cardForm.value;
      this.payment = new Payment({
        id: -1,
        cardName: formValue.name,
        cardNumber: formValue.cardNumber,
        expirationDate: formValue.expirationDate,
        CVV: formValue.cvv
      });
      const newClient = new Client({
        id: 1,
        password: "",
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
        birthDate: "",
        address: "",
        additionalAddress: "",
        postalCode: "",
        city: "",
      });
      this.payment.client = newClient;
      this.paymentService.addPaymentCard(this.payment).subscribe(result => {
        this.router.navigate(['/home']);
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
}