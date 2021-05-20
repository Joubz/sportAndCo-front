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
 * Validateur de la correspondance des mots de passe
 * @param controlName Le champ mot de passe
 * @param matchingControlName Le champ mot de passe
 * @return mustMatch qui indique si les mots de passe correspondent où non
 */
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

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
   * Permet d'attendre que la liste des mails clients déjà existant soit chargée pour l'afficher
   */
  listMailLoaded: Promise<boolean>;

  /**
   * Données du client à enregister
   */
  client: Client;

  /**
   * Formulaire d'ajout d'un client
   */
  clientForm: FormGroup;

  /**
   * La liste des mails clients déjà existants
   */
  mailList: string[];

  /**
   * Le formulaire a été soumis
   */
  isSubmit: boolean;

  /**
   * String pour le message d'erreur du prénom
   */
  messageErrorFirstName: string;

  /**
   * String pour le message d'erreur du nom de famille
   */
  messageErrorLastName: string;

  /**
   * String pour le message d'erreur du mail
   */
  messageErrorEmail: string;

  /**
   * String pour le message d'erreur du mot de passe
   */
  messageErrorPassword: string;

  /**
   * String pour le message d'erreur de la confirmation du mot de passe
   */
  messageErrorConfirmPassword: string;

  /**
   * String pour le message d'erreur du téléphone
   */
  messageErrorPhone: string;

  /**
   * String pour le message d'erreur de la date de naissance
   */
  errorMessageBirthDate: string;

  /**
   * String pour le message d'erreur de l'adresse
   */
  messageErrorAddress: string;

  /**
   * String pour le message d'erreur du complément d'adresse
   */
  messageErrorAdditionalAddress: string;

  /**
   * String pour le message d'erreur du code postal
   */
  messageErrorPostalCode: string;

  /**
   * String pour le message d'erreur de la ville
   */
  messageErrorCity: string;

  /**
   * Booleen pour vérifier que le mail n'est pas déjà utilisé
   */
  isMailNotTakenAlready: boolean;

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
    scrollBarColor: '#dfe3e9',
    minDate: new Date()
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
    this.clientService.getListMailClient().subscribe(list => {
      this.mailList = list;
      this.isSubmit = false;
      this.isMailNotTakenAlready = false;
      this.isBirthDateFilled = false;
      this.initForm();
      this.listMailLoaded = Promise.resolve(true);
    });
  }

  /**
   * Initialisation du formulaire
   */
  initForm(): void {
    this.clientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.maxLength(250), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(15)]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address: ['', [Validators.required, Validators.maxLength(250)]],
      additionalAddress: ['', [Validators.required, Validators.maxLength(250)]],
      postalCode: ['', [Validators.required, Validators.maxLength(5), Validators.pattern("^[0-9]*$")]],
      city: ['', [Validators.required, Validators.maxLength(250)]],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  /**
   * Permet de retourner les controls du formulaire de création du client facilement
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
            this.messageErrorFirstName = "Le champ doit être rempli";
            return true;
          } else if (this.f.firstName.errors.maxlength) {
            this.messageErrorFirstName = "Le champ doit être d'une longueur maximale de 100 caractères";
            return true;
          }
        }
        break;
      }
      case 'lastName': {
        if (this.f.lastName.invalid && (this.f.lastName.dirty || this.f.lastName.touched || this.isSubmit)) {
          if (this.f.lastName.errors.required) {
            this.messageErrorLastName = "Le champ doit être rempli";
            return true;
          } else if (this.f.lastName.errors.maxlength) {
            this.messageErrorLastName = "Le champ doit être d'une longueur maximale de 100 caractères";
            return true;
          }
        }
        break;
      }
      case 'email': {
        if (this.f.email.invalid && (this.f.email.dirty || this.f.email.touched || this.isSubmit) || this.isMailNotTakenAlready) {
          if (this.isMailNotTakenAlready) {
            this.messageErrorEmail = "Ce mail est déjà pris. Veuillez choisir un autre mail";
            return true;
          } else if (this.f.email.errors.required) {
            this.messageErrorEmail = "Le champ doit être rempli";
            return true;
          } else if (this.f.email.errors.maxlength) {
            this.messageErrorEmail = "Le champ doit être d'une longueur maximale de 250 caractères";
            return true;
          } else if (this.f.email.errors.pattern) {
            this.messageErrorEmail = "Le mail doit être valide";
            return true;
          }
        }
        break;
      }
      case 'password': {
        if (this.f.password.invalid && (this.f.password.dirty || this.f.password.touched || this.isSubmit)) {
          if (this.f.password.errors.required) {
            this.messageErrorPassword = "Le mot de passe doit être rempli";
            return true;
          } else if (this.f.password.errors.maxlength) {
            this.messageErrorPassword = "Le mot de passe doit être d'une longueur maximale de 15 caractères";
            return true;
          }
        }
        break;
      }
      case 'confirmPassword': {
        if (this.f.confirmPassword.invalid && (this.f.confirmPassword.dirty || this.f.confirmPassword.touched || this.isSubmit)) {
          if (this.f.confirmPassword.errors.required) {
            this.messageErrorConfirmPassword = "Le mot de passe doit être rempli";
            return true;
          } else if (this.f.confirmPassword.errors.maxlength) {
            this.messageErrorConfirmPassword = "Le mot de passe doit être d'une longueur maximale de 15 caractères";
            return true;
          } else if (this.f.confirmPassword.errors.mustMatch) {
            this.messageErrorConfirmPassword = "Les mots de passe doivent correspondres";
            return true;
          }
        }
        break;
      }
      case 'phone': {
        if (this.f.phone.invalid && (this.f.phone.dirty || this.f.phone.touched || this.isSubmit)) {
          if (this.f.phone.errors.required) {
            this.messageErrorPhone = "Le champ doit être rempli";
            return true;
          } else if (this.f.phone.errors.maxlength) {
            this.messageErrorPhone = "Le champ doit être d'une longueur maximale de 10 caractères";
            return true;
          } else if (this.f.phone.errors.pattern) {
            this.messageErrorPhone = "Le téléphone doit être valide";
            return true;
          }
        }
        break;
      }
      case 'address': {
        if (this.f.address.invalid && (this.f.address.dirty || this.f.address.touched || this.isSubmit)) {
          if (this.f.address.errors.required) {
            this.messageErrorAddress = "Le champ doit être rempli";
            return true;
          } else if (this.f.address.errors.maxlength) {
            this.messageErrorAddress = "Le champ doit être d'une longueur maximale de 250 caractères";
            return true;
          }
        }
        break;
      }
      case 'additionalAddress': {
        if (this.f.additionalAddress.invalid && (this.f.additionalAddress.dirty || this.f.additionalAddress.touched || this.isSubmit)) {
          if (this.f.additionalAddress.errors.required) {
            this.messageErrorAdditionalAddress = "Le champ doit être rempli";
            return true;
          } else if (this.f.additionalAddress.errors.maxlength) {
            this.messageErrorAdditionalAddress = "Le champ doit être d'une longueur maximale de 250 caractères";
            return true;
          }
        }
        break;
      }
      case 'postalCode': {
        if (this.f.postalCode.invalid && (this.f.postalCode.dirty || this.f.postalCode.touched || this.isSubmit)) {
          if (this.f.postalCode.errors.required) {
            this.messageErrorPostalCode = "Le champ doit être rempli";
            return true;
          } else if (this.f.postalCode.errors.maxlength) {
            this.messageErrorPostalCode = "Le champ doit être d'une longueur maximale de 5 caractères";
            return true;
          } else if (this.f.postalCode.errors.pattern) {
            this.messageErrorPostalCode = "Format incorrect";
            return true;
          }
        }
        break;
      }
      case 'city': {
        if (this.f.city.invalid && (this.f.city.dirty || this.f.city.touched || this.isSubmit)) {
          if (this.f.city.errors.required) {
            this.messageErrorCity = "Le champ doit être rempli";
            return true;
          } else if (this.f.city.errors.maxlength) {
            this.messageErrorCity = "Le champ doit être d'une longueur maximale de 250 caractères";
            return true;
          }
        }
        break;
      }
    }
  }

  /**
   * Fonction qui détecte si un mail est déjà utlisé en base
   */
  checkEmail(): void {
    this.isMailNotTakenAlready = false;
    this.mailList.forEach(mail => {
      if (this.f.email.value === mail) {
        this.isMailNotTakenAlready = true;
      }
    });
  }

  /**
   * Détection des erreurs sur le champ date de naissance
   * @returns La validité du champ concerné
   */
  dateErrorDetection(): boolean {
    if (!this.isBirthDateFilled) {
      this.errorMessageBirthDate = "La date n'a pas été remplis";
      return true;
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
   * Récupération du nombre de caractères écrits pour l'email
   */
  get emailChars(): number {
    return this.f.email.value?.length || 0;
  }

  /**
   * Récupération du nombre de caractères écrits pour le mot de passe
   */
  get passwordChars(): number {
    return this.f.password.value?.length || 0;
  }

  /**
   * Récupération du nombre de caractères écrits pour la confirmation du mot de passe
   */
  get confirmPasswordChars(): number {
    return this.f.confirmPassword.value?.length || 0;
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
      !this.f.confirmPassword.invalid &&
      !this.f.email.invalid &&
      !this.isMailNotTakenAlready &&
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
