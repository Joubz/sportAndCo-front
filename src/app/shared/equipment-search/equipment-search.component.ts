import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {forkJoin, Subscription} from "rxjs";

import {Category} from "../models/category.model";
import {CategoryService} from "../../core/services/category.service";
import {Metropolises} from "../models/metropolises.model";
import {MetropolisesService} from "../../core/services/metropolises.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DatepickerOptions} from "ng2-datepicker";
import locale from "date-fns/locale/en-US";
import {EquipmentSearchProvider} from "../../core/providers/equipment-search.providers";

/**
 * Composant de le la recherche
 */
@Component({
  selector: 'app-equipment-search',
  templateUrl: './equipment-search.component.html',
  styleUrls: ['./equipment-search.component.css']
})
export class EquipmentSearchComponent implements OnInit, OnDestroy {

  /**
   * Permet d'attendre que les catégories & les métropoles soient chargées pour afficher la barre de recherch
   */
  categoryAndMetropolisesLoaded: Promise<boolean>;

  /**
   * Souscription au service de récupération des champs de la recherche
   */
  getSearchSub: Subscription;

  /**
   * Liste des catégories
   */
  listCategory: Category[];

  /**
   * Liste des métropoles
   */
  listMetropolises: Metropolises[];

  /**
   * Formulaire de sélection de la recherche
   */
  searchForm: FormGroup;

  /**
   * Vérifie si les dates sélectionnées sont ok
   */
  areDatesOk: boolean;

  /**
   * Date de début sélectionnée par le client
   */
  startDateSelect: Date;

  /**
   * Date de fin sélectionnée par le client
   */
  endDateSelect: Date;

  /**
   * Message d'erreur sur le choix des dates
   */
  errorMessageDate = "Erreur : La date de fin ne peux être inférieur à la date de début";

  /**
   * Options des sélectionneurs de dates
   */
  startDatePickerOptions: DatepickerOptions = {
    placeholder: 'Début de location',
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
    placeholder: 'Fin de location',
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
   * @param categoryService Service de gestion des catégories
   * @param metropolisesService Service de gestion des métropoles
   * @param equipmentSearchProvider Provider pour la sauvegarde de champs de la rercherche
   * @param router Service de gestion des routes
   * @param fb Utilitaire de création de formulaire
   */
  constructor(
    private categoryService: CategoryService,
    private metropolisesService: MetropolisesService,
    private equipmentSearchProvider: EquipmentSearchProvider,
    private router: Router,
    private fb: FormBuilder
  ) { }

  /**
   * Initialise le composant
   */
  ngOnInit(): void {
    this.getSearchSub = forkJoin([
      this.categoryService.getListCategory(),
      this.metropolisesService.getListMetropolises(),
    ]).subscribe(([listCategory, listMetropolises]) => {
      this.listCategory = listCategory;
      this.listMetropolises = listMetropolises;

      this.areDatesOk =  true;

      this.initForm();

      if ( this.equipmentSearchProvider.searchFields.productName !== null) {
        this.f.productName.setValue(this.equipmentSearchProvider.searchFields.productName);
      }
      if ( this.equipmentSearchProvider.searchFields.startDate !== null) {
        this.startDateSelect = new Date(this.equipmentSearchProvider.searchFields.startDate);
      }
      if ( this.equipmentSearchProvider.searchFields.endDate !== null) {
        this.endDateSelect = new Date(this.equipmentSearchProvider.searchFields.endDate);
      }
      if ( this.equipmentSearchProvider.searchFields.category !== null) {
        this.f.categorySelect.setValue(this.equipmentSearchProvider.searchFields.category);
      }
      if ( this.equipmentSearchProvider.searchFields.metropolises !== null) {
        this.f.metropolisesSelect.setValue(this.equipmentSearchProvider.searchFields.metropolises);
      }

      this.categoryAndMetropolisesLoaded = Promise.resolve(true);
    });
  }

  /**
   * Unsubscribe
   */
  ngOnDestroy(): void {
    this.getSearchSub?.unsubscribe();
  }

  /**
   * Initialisation du formulaire
   */
  initForm(): void {
    this.searchForm = this.fb.group({
      productName: [''],
      categorySelect: [''],
      metropolisesSelect: ['']
    });
  }

  /**
   * Permet de retourner les controls du formulaire de rendez-vous facilement
   */
  get f() {
    return this.searchForm.controls;
  }

  /**
   * Fonction qui gère le changement de date
   */
  changeStartDate(): void {
    if (this.endDateSelect !== null) {
      this.areDatesCorrect();
    }
  }

  /**
   * Fonction qui gère le changement de date
   */
  changeEndDate(): void {
    if (this.startDateSelect !== null) {
      this.areDatesCorrect();
    }
  }

  /**
   * Fonction vérifiant si les dates sélectionnées sont conformes, affiche un message d'erreur sinon
   */
  areDatesCorrect(): void {

    if (this.endDateSelect !== null) {
      if (this.startDateSelect > this.endDateSelect) {
        this.areDatesOk = false;
      } else {
        this.areDatesOk =  true;
      }
    } else {
      this.areDatesOk =  true;
    }

  }

  /**
   * Récupère les classes à appliquer aux boutons en fonction du statut de disponibilité
   * @param buttonName Nom du bouton affiché
   * @returns Les classes CSS à appliquer
   */
  getButtonClass(buttonName: string): string {
    switch (buttonName) {
      case 'search':
        return !this.areDatesOk ? 'disabled' : 'search';
    }
  }

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
   * Fonction créant la recherche, et appellant la liste
   */
  search() {
    if (this.areDatesOk) {

      if (this.f.productName.value === "") {
        this.f.productName.setValue(" ");
      }

      if (this.startDateSelect === undefined) {
        this.startDateSelect = new Date();
      }

      if (this.endDateSelect === undefined) {
        if (this.startDateSelect === undefined) {
          this.endDateSelect = new Date();
        } else {
          this.endDateSelect = this.startDateSelect;
        }
      }

      if (this.f.categorySelect.value === "") {
        this.f.categorySelect.setValue("0");
      }

      if (this.f.metropolisesSelect.value === "") {
        this.f.metropolisesSelect.setValue("0");
      }

      this.equipmentSearchProvider.fillProvider(this.f.productName.value, this.formatDate(this.startDateSelect), this.formatDate(this.endDateSelect),
        this.f.categorySelect.value,  this.f.metropolisesSelect.value);

      this.router.navigate(['../equipment/equipment-list']);
    }
  }


}
