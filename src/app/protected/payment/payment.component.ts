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

  @ViewChild('myDiv') myDiv: ElementRef;

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
  numberRegEx = "/^[0-9]{16}$/";

  ngOnInit(): void {
    this.getPaymentCardSub = this.paymentService.getPaymentCard(1)
      .subscribe(
        paymentList => {
          this.listPayment = paymentList; }
      ) ;
    this.initForm();
  }

  ngOnDestroy(): void {
  }

  /**
   *
   * @param payment la carte de paiement contenue par la ligne du tableau
   */
  selectMethod(payment: Payment): void{
    this.paymentSelectedName = payment.cardName;
    console.log(this.paymentSelectedName);
  }

  initForm() {
    this.cardForm = this.formBuilder.group({
      // TODO vérifier qu'ils soient des chiffres et pas des caracteres
      cardNumber: ['', [Validators.required/*, Validators.pattern(this.numberRegEx)*/,  Validators.minLength(16), Validators.maxLength(16)]],
      name: ['', Validators.required],
      expirationDate: [new Date(), [Validators.required]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  /**
   * Soumet le formuliaire
   */
  onSubmitForm() {
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
      console.log(this.payment);
      console.log(newClient);
      this.payment.client = newClient;
      this.paymentService.addPaymentCard(this.payment).subscribe(result => {
        this.router.navigate(['/home']);
      });
    }

  }
}
