import { Component, OnInit } from '@angular/core';
import {Client} from "../../shared/models/clientRent.model";
import {ClientService} from "../../core/services/client.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatepickerOptions} from "ng2-datepicker";
import locale from "date-fns/locale/en-US";
import {Router} from "@angular/router";
import {NotificationsService} from "../../core/services/notification.service";
import { Notification, NotificationBackground, NotificationIcon } from 'src/app/shared/models/notification.model';


/**
 * Composant de la page inscription d'un client
 */
@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.css']
})
export class ClientRegistrationComponent implements OnInit {

  /**
   * Données du client à enregister
   */
  client: Client;

  /**
   * Formulaire d'ajout d'une anomalie
   */
  clientForm: FormGroup;

  /**
   * Le formulaire a été soumis
   */
  isSubmit: boolean;

  /**
   * String pour le message d'erreur de errorDetection
   */
  messageError1: string;

  /**
   * String pour le message d'erreur de errorDetection
   */
  messageError2: string;

  /**
   * String pour le message d'erreur de errorDetection
   */
  messageError3: string;

  /**
   * String pour le message d'erreur de errorDetection
   */
  messageError4: string;

  /**
   * String pour le message d'erreur de errorDetection
   */
  messageError5: string;

  /**
   * String pour le message d'erreur de errorDetection
   */
  messageError6: string;

  /**
   * String pour le message d'erreur de errorDetection
   */
  messageError7: string;

  /**
   * String pour le message d'erreur de errorDetection
   */
  messageError8: string;

  /**
   * String pour le message d'erreur de errorDetection
   */
  messageError9: string;

  /**
   * String pour le message d'erreur de la date de naissance
   */
  errorMessageDate: string;

  /**
   * Boolean pour remplissage de la date
   */
  isBirthDateFilled: boolean;

  /**
   * Date de début sélectionnée par le client
   */
  birthDate: Date;

  /**
   * Options des sélectionneurs de dates
   */
  birthDatePickerOptions: DatepickerOptions = {
    placeholder: 'Date de naissance',
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
   * @param clientService Service de gestion client
   * @param fb Constructeur de formulaire natif angular
   * @param router Gestion du routing (natif angular)
   * @param notificationsService Service de gestion des popin de notification
   */
  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private router: Router,
    private notificationsService: NotificationsService
  ) { }

  /**
   * Initialise le composant
   */
  ngOnInit(): void {
    this.isSubmit = false;
    this.isBirthDateFilled = false;
    this.initForm();
  }

  /**
   * Initialisation du formulaire
   */
  initForm(): void {
    this.clientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.maxLength(250), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone: ['', [Validators.required, Validators.maxLength(100)]],
      address: ['', [Validators.required, Validators.maxLength(250)]],
      additionalAddress: ['', [Validators.required, Validators.maxLength(250)]],
      postalCode: ['', [Validators.required, Validators.maxLength(250)]],
      city: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }

  /**
   * Permet de retourner les controls du formulaire de création d'anomalie facilement
   */
  get f() {
    return this.clientForm.controls;
  }

  /**
   * Détection des erreurs sur les champs
   * @param formField Champs concerné pour la vérification
   * @returns La validité du champ concerné
   */
  errorDetection(formField: string): boolean {
    switch (formField) {
      case 'firstName': {
        if (this.f.firstName.invalid && (this.f.firstName.dirty || this.f.firstName.touched || this.isSubmit)) {
          if (this.f.firstName.errors.required) {
            this.messageError1 = "Le champ doit être rempli";
            return true;
          } else if (this.f.firstName.errors.maxlength) {
            this.messageError1 = "Le champ doit être d'une longueur maximale de 100 caractères";
            return true;
          }
        }
        break;
      }
      case 'lastName': {
        if (this.f.lastName.invalid && (this.f.lastName.dirty || this.f.lastName.touched || this.isSubmit)) {
          if (this.f.lastName.errors.required) {
            this.messageError2 = "Le champ doit être rempli";
            return true;
          } else if (this.f.lastName.errors.maxlength) {
            this.messageError2 = "Le champ doit être d'une longueur maximale de 100 caractères";
            return true;
          }
        }
        break;
      }
      case 'password': {
        if (this.f.password.invalid && (this.f.password.dirty || this.f.password.touched || this.isSubmit)) {
          if (this.f.password.errors.required) {
            this.messageError3 = "Le mot de passe doit être rempli";
            return true;
          } else if (this.f.password.errors.maxlength) {
            this.messageError3 = "Le mot de passe doit être d'une longueur maximale de 15 caractères";
            return true;
          }
        }
        break;
      }
      case 'email': {
        if (this.f.email.invalid && (this.f.email.dirty || this.f.email.touched || this.isSubmit)) {
          if (this.f.email.errors.required) {
            this.messageError4 = "Le champ doit être rempli";
            return true;
          } else if (this.f.email.errors.maxlength) {
            this.messageError4 = "Le champ doit être d'une longueur maximale de 250 caractères";
            return true;
          }
          else if (this.f.email.errors.pattern) {
            this.messageError4 = "Le mail doit être valide";
            return true;
          }
        }
        break;
      }
      case 'phone': {
        if (this.f.phone.invalid && (this.f.phone.dirty || this.f.phone.touched || this.isSubmit)) {
          if (this.f.phone.errors.required) {
            this.messageError5 = "Le champ doit être rempli";
            return true;
          } else if (this.f.phone.errors.maxlength) {
            this.messageError5 = "Le champ doit être d'une longueur maximale de 250 caractères";
            return true;
          }
        }
        break;
      }
      case 'address': {
        if (this.f.address.invalid && (this.f.address.dirty || this.f.address.touched || this.isSubmit)) {
          if (this.f.address.errors.required) {
            this.messageError6 = "Le champ doit être rempli";
            return true;
          } else if (this.f.address.errors.maxlength) {
            this.messageError6 = "Le champ doit être d'une longueur maximale de 250 caractères";
            return true;
          }
        }
        break;
      }
      case 'additionalAddress': {
        if (this.f.additionalAddress.invalid && (this.f.additionalAddress.dirty || this.f.additionalAddress.touched || this.isSubmit)) {
          if (this.f.additionalAddress.errors.required) {
            this.messageError7 = "Le champ doit être rempli";
            return true;
          } else if (this.f.additionalAddress.errors.maxlength) {
            this.messageError7 = "Le champ doit être d'une longueur maximale de 250 caractères";
            return true;
          }
        }
        break;
      }
      case 'postalCode': {
        if (this.f.postalCode.invalid && (this.f.postalCode.dirty || this.f.postalCode.touched || this.isSubmit)) {
          if (this.f.postalCode.errors.required) {
            this.messageError8 = "Le champ doit être rempli";
            return true;
          } else if (this.f.postalCode.errors.maxlength) {
            this.messageError8 = "Le champ doit être d'une longueur maximale de 250 caractères";
            return true;
          }
        }
        break;
      }
      case 'city': {
        if (this.f.city.invalid && (this.f.city.dirty || this.f.city.touched || this.isSubmit)) {
          if (this.f.city.errors.required) {
            this.messageError9 = "Le champ doit être rempli";
            return true;
          } else if (this.f.city.errors.maxlength) {
            this.messageError9 = "Le champ doit être d'une longueur maximale de 250 caractères";
            return true;
          }
        }
        break;
      }
    }
  }

  /**
   * Récupération du nombre de caractères écrits pour le prénom
   */
  get firstNameChars(): number {
    return this.f.firstName.value?.length || 0;
  }

  /**
   * Récupération du nombre de caractères écrits pour le nom de famille
   */
  get lastNameChars(): number {
    return this.f.lastName.value?.length || 0;
  }

  /**
   * Récupération du nombre de caractères écrits pour le mot de passe
   */
  get passwordChars(): number {
    return this.f.password.value?.length || 0;
  }

  /**
   * Récupération du nombre de caractères écrits pour l'email
   */
  get emailChars(): number {
    return this.f.email.value?.length || 0;
  }

  /**
   * Récupération du nombre de caractères écrits pour le téléphone
   */
  get phoneChars(): number {
    return this.f.phone.value?.length || 0;
  }

  /**
   * Récupération du nombre de caractères écrits pour l'adresse
   */
  get addressChars(): number {
    return this.f.address.value?.length || 0;
  }

  /**
   * Récupération du nombre de caractères écrits pour l'adresse additionnel
   */
  get additionalAddressChars(): number {
    return this.f.additionalAddress.value?.length || 0;
  }

  /**
   * Récupération du nombre de caractères écrits pour le code postal
   */
  get postalCodeChars(): number {
    return this.f.postalCode.value?.length || 0;
  }

  /**
   * Récupération du nombre de caractères écrits pour la ville
   */
  get cityChars(): number {
    return this.f.city.value?.length || 0;
  }

  /**
   * Met à jour le booleen de date de naissance
   */
  changeBirthDate(): void {
    this.isBirthDateFilled = true;
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
   * Fonction de création du client
   */
  onSubmit(): void {
    this.isSubmit = true;

    if (
      !this.f.firstName.invalid &&
      !this.f.lastName.invalid &&
      !this.f.password.invalid &&
      !this.f.email.invalid &&
      !this.f.phone.invalid &&
      this.isBirthDateFilled &&
      !this.f.address.invalid &&
      !this.f.additionalAddress.invalid &&
      !this.f.postalCode.invalid &&
      !this.f.city.invalid
    ) {
      const newClient = new Client({
        id: -1,
        password: this.f.password.value,
        firstName: this.f.firstName.value,
        lastName: this.f.lastName.value,
        email: this.f.email.value,
        phone: this.f.phone.value,
        birthDate: this.formatDate(this.birthDate),
        address: this.f.address.value,
        additionalAddress: this.f.additionalAddress.value,
        postalCode: this.f.postalCode.value,
        city: this.f.city.value
      });

      this.clientService.createClient(newClient).subscribe(result => {
        const notification = new Notification({
          message: 'Votre compte à bien été créer. Un email de confirmation va vous être envoyé.',
          background: NotificationBackground.GREEN,
          icon: NotificationIcon.CHECK
        });

        this.notificationsService.genericNotification(notification);

        this.router.navigate(['/client-login']);
      });
    }

  }

}
