import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {EquipmentService} from "../../core/services/equipment.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NotificationsService} from "../../core/services/notification.service";
import {DatepickerOptions} from "ng2-datepicker";
import locale from "date-fns/locale/en-US";
import {Category} from "../../shared/models/category.model";
import {TokenStorageService} from "../../core/services/token-storage.service";
import {CategoryService} from "../../core/services/category.service";
import {Equipment} from "../../shared/models/equipment.model";
import {Notification, NotificationBackground, NotificationIcon} from "../../shared/models/notification.model";

/**
 * Composant de la page création d'un équipement par un loueur
 */
@Component({
  selector: 'app-create-equipment',
  templateUrl: './create-equipment.component.html',
  styleUrls: ['./create-equipment.component.css']
})
export class CreateEquipmentComponent implements OnInit {

  /**
   * Formulaire d'ajout d'un client
   */
  equipmentForm: FormGroup;

  /**
   * Le formulaire a été soumis
   */
  isSubmit: boolean;

  /**
   * Liste des categories
   */
  categoryList: Category[];

  /**
   * La category Selectionné
   */
  categorySelected: Category;

  /**
   * Booleen pour la sélection de la catégorie
   */
  isCategorySelected: boolean;

  /**
   * String pour le message d'erreur du nom d'équipement
   */
  messageErrorEquipmentName: string;

  /**
   * String pour le message d'erreur de la description
   */
  messageErrorDescription: string;

  /**
   * String pour le message d'erreur du prix
   */
  messageErrorPrice: string;

  /**
   * Message d'erreur sur le choix des dates
   */
  errorMessageDate =
    'Erreur : La date de fin ne peux être inférieur à la date de début';

  /**
   * Message d'erreur sur la quantité
   */
  errorMessageQuantity =
    'Erreur : La quantité doit être supérieur à 0';

  /**
   * Message d'erreur sur l'image'
   */
  errorMessageImage1 =
    'Erreur : L\'image doit être sélectionnée';

  /**
   * Quantité totale
   */
  totalQuantity: number;

  /**
   *  String pour le message d'erreur de la date de début
   */
  errorMessageStartDate: string;

  /**
   *  String pour le message d'erreur de la date de début
   */
  messageErrorCategory: string;

  /**
   *  String pour le message d'erreur de la date de fin
   */
  errorMessageEndDate: string;

  /**
   * Boolean pour remplissage de la date de début
   */
  isStartDateFilled: boolean;

  /**
   * Date de début sélectionnée par le client
   */
  startDate: Date;

  /**
   * Boolean pour remplissage de la date de de fin
   */
  isEndDateFilled: boolean;

  /**
   * Date de fin sélectionnée par le client
   */
  endDate: Date;

  /**
   * Pour vérifier que les dates sont conformes
   */
  areDatesOk: boolean;

  /**
   * Options des sélectionneurs de la date de début
   */
  startDatePickerOptions: DatepickerOptions = {
    placeholder: 'Date de début de location',
    format: 'LLLL do yyyy',
    formatTitle: 'LLLL yyyy',
    formatDays: 'EEEEE',
    firstCalendarDay: 1,
    locale,
    position: 'bottom',
    inputClass: 'datepicker-connexion',
    calendarClass: 'datepicker-default',
    scrollBarColor: '#dfe3e9',
    maxDate: new Date()
  };

  /**
   * Options des sélectionneurs de la date de fin
   */
  endDatePickerOptions: DatepickerOptions = {
    placeholder: 'Date de fin de location',
    format: 'LLLL do yyyy',
    formatTitle: 'LLLL yyyy',
    formatDays: 'EEEEE',
    firstCalendarDay: 1,
    locale,
    position: 'bottom',
    inputClass: 'datepicker-connexion',
    calendarClass: 'datepicker-default',
    scrollBarColor: '#dfe3e9',
    maxDate: new Date()
  };


  /**
   * Constructeur du composant
   * @param equipmentService Service de gestion equipement
   * @param fb Constructeur de formulaire natif angular
   * @param router Gestion du routing (natif angular)
   * @param notificationsService Service de gestion des popin de notification
   * @param tokenStorageService Service de gestion des tokens
   * @param categoryService Service de gestion des catégories
   * @param cd changedetector pour controle sur fichier
   */
  constructor(
    private equipmentService: EquipmentService,
    private fb: FormBuilder,
    private router: Router,
    private notificationsService: NotificationsService,
    private tokenStorageService: TokenStorageService,
    private categoryService: CategoryService,
    private cd: ChangeDetectorRef,
  ) { }

  /**
   * Initialise le composant
   */
  ngOnInit(): void {
    this.categoryService.getListCategory().subscribe(list => {
      this.categoryList = list;
      this.isStartDateFilled = false;
      this.isEndDateFilled = false;
      this.isCategorySelected = false;
      this.totalQuantity = 0;
      this.initForm();
    });
  }

  /**
   * Initialisation du formulaire
   */
  initForm(): void {
    this.equipmentForm = this.fb.group({
      equipmentName: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      price: ['', [Validators.required, Validators.maxLength(15)]],
      categorySelect: ['', [Validators.required]],
      imageLink1: ['', [Validators.required]],
      imageLink2: [''],
      imageLink3: [''],
    });
  }

  /**
   * Permet de retourner les controls du formulaire de création du client facilement
   */
  get f() {
    return this.equipmentForm.controls;
  }

  /**
   * Détection des erreurs sur les champs
   * @param formField Champs concerné pour la vérification
   * @returns La validité du champ concerné
   */
  errorDetection(formField: string): boolean {
    switch (formField) {
      case 'equipmentName': {
        if (this.f.equipmentName.invalid && (this.f.equipmentName.dirty || this.f.equipmentName.touched || this.isSubmit)) {
          if (this.f.equipmentName.errors.required) {
            this.messageErrorEquipmentName = "Le champ doit être rempli";
            return true;
          } else if (this.f.equipmentName.errors.maxlength) {
            this.messageErrorEquipmentName = "Le champ doit être d'une longueur maximale de 100 caractères";
            return true;
          }
        }
        break;
      }
      case 'description': {
        if (this.f.description.invalid && (this.f.description.dirty || this.f.description.touched || this.isSubmit)) {
          if (this.f.description.errors.required) {
            this.messageErrorDescription = "Le champ doit être rempli";
            return true;
          } else if (this.f.description.errors.maxlength) {
            this.messageErrorDescription = "Le champ doit être d'une longueur maximale de 1000 caractères";
            return true;
          }
        }
        break;
      }
      case 'price': {
        if (this.f.price.invalid && (this.f.price.dirty || this.f.price.touched || this.isSubmit)) {
          if (this.f.price.errors.required) {
            this.messageErrorPrice = "Le champ doit être rempli";
            return true;
          } else if (this.f.price.errors.maxlength) {
            this.messageErrorPrice = "Le champ doit être d'une longueur maximale de 15 caractères";
            return true;
          }
        }
        break;
      }
      case 'categorySelect': {
        if (this.f.categorySelect.invalid && (this.f.categorySelect.dirty || this.f.categorySelect.touched || this.isSubmit)) {
          if (this.f.categorySelect.errors.required) {
            this.messageErrorCategory = "Le champ doit être rempli";
            return true;
          }
        }
        break;
      }
    }
  }

  /**
   * Augmente la quantité, vérifie la disponibilité
   */
  augmentQuantity(): void {
    this.totalQuantity++;
  }

  /**
   * Diminue la quantité, vérifie la disponibilité
   */
  diminishQuantity(): void {
    this.totalQuantity--;
  }

  /**
   * Détection des erreurs sur le champ date de début
   * @returns La validité du champ concerné
   */
  startDateErrorDetection(): boolean {
    if (!this.isStartDateFilled) {
      this.errorMessageStartDate = "La date n'a pas été remplis";
      return true;
    }
  }

  /**
   * Détection des erreurs sur le champ date de fin
   * @returns La validité du champ concerné
   */
  endDateErrorDetection(): boolean {
    if (!this.isEndDateFilled) {
      this.errorMessageEndDate = "La date n'a pas été remplis";
      return true;
    }
  }

  /**
   * Fonction qui gère le changement de date du début
   */
  changeStartDate(): void {
    this.isStartDateFilled = true;
    this.areDatesCorrect();
  }

  /**
   * Fonction qui gère le changement de date de fin
   */
  changeEndDate(): void {
    this.isEndDateFilled = true;
    this.areDatesCorrect();
  }

  /**
   * Fonction vérifiant si les dates sélectionnées sont conformes, affiche un message d'erreur sinon
   */
  areDatesCorrect(): void {
    if (this.startDate > this.endDate) {
      this.areDatesOk = false;
    } else {
      this.areDatesOk = true;
    }
  }

  /**
   * Récupération du nombre de caractères écrits pour le nom d'équipement
   */
  get equipmentNameChars(): number {
    return this.f.equipmentName.value?.length || 0;
  }

  /**
   * Récupération du nombre de caractères écrits pour la description
   */
  get descriptionChars(): number {
    return this.f.description.value?.length || 0;
  }

  /**
   * Récupération du nombre de caractères écrits pour le prix
   */
  get priceChars(): number {
    return this.f.price.value?.length || 0;
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
   * Enregistre l'image passée par l'utilisateur en base64
   * @param event Evenement contenant l'image
   */
  onFileChangeImageLink1(event: any): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.equipmentForm.patchValue({
          imageLink1: reader.result
        });

        this.cd.markForCheck();
      };
    }
  }

  /**
   * Enregistre l'image passée par l'utilisateur en base64
   * @param event Evenement contenant l'image
   */
  onFileChangeImageLink2(event: any): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.equipmentForm.patchValue({
          imageLink2: reader.result
        });

        this.cd.markForCheck();
      };
    }
  }

  /**
   * Enregistre l'image passée par l'utilisateur en base64
   * @param event Evenement contenant l'image
   */
  onFileChangeImageLink3(event: any): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.equipmentForm.patchValue({
          imageLink3: reader.result
        });

        this.cd.markForCheck();
      };
    }
  }

  /**
   * Supprime l'image sélectionnée
   */
  onDeleteImageLink1(): void {
    this.equipmentForm.patchValue({
      imageLink1: ""
    });
  }

  /**
   * Supprime l'image sélectionnée
   */
  onDeleteImageLink2(): void {
    this.equipmentForm.patchValue({
      imageLink2: ""
    });
  }

  /**
   * Supprime l'image sélectionnée
   */
  onDeleteImageLink3(): void {
    this.equipmentForm.patchValue({
      imageLink3: ""
    });
  }


  /**
   * Fonction de création du client
   */
  onSubmit(): void {
    this.isSubmit = true;

    if (
      !this.f.equipmentName.invalid &&
      !this.f.description.invalid &&
      !this.f.price.invalid &&
      this.totalQuantity !== 0 &&
      this.isStartDateFilled &&
      this.isEndDateFilled &&
      !this.f.categorySelect.invalid &&
      !this.f.imageLink1.invalid &&
      !this.f.imageLink2.invalid &&
      !this.f.imageLink3.invalid
    ) {
      const newEquipment = new Equipment({
        id: -1,
        renter: this.tokenStorageService.getRenter(),
        metropolises: null,
        category: this.f.categorySelect.value,
        name: this.f.equipmentName.value,
        description: this.f.description.value,
        startDate: this.formatDate(this.startDate),
        endDate: this.formatDate(this.endDate),
        price: this.f.price.value,
        totalQuantity: this.totalQuantity,
        imageLink1: this.f.imageLink1.value,
        imageLink2: this.f.imageLink2.value,
        imageLink3: this.f.imageLink3.value
      });

      this.equipmentService.addEquipment(newEquipment).subscribe(result => {
        const notification = new Notification({
          message: 'Votre équipement a bien été créer.',
          background: NotificationBackground.GREEN,
          icon: NotificationIcon.CHECK
        });

        this.notificationsService.genericNotification(notification);

        this.router.navigate(['/renter/equipment-list']);

      });
    }
  }

}
