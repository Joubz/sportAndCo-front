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
  startDateSelect: Date = new Date();

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
   * @param router Service de gestion des routes
   * @param fb Utilitaire de création de formulaire
   */
  constructor(
    private categoryService: CategoryService,
    private metropolisesService: MetropolisesService,
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
        return !this.areDatesOk ? 'disabled' : 'common';
    }
  }

  /**
   * Fonction créant la recherche, et appellant la liste
   */
  search() {
    if (this.areDatesOk) {
      console.log(this.f.productName.value);
      console.log(this.startDateSelect);
      console.log(this.endDateSelect);
      console.log(this.f.categorySelect.value);
      console.log(this.f.metropolisesSelect.value);
    }

    //  this.router.navigate(['../equipment-list', this.f.productName.value, this.startDateSelect, this.endDateSelect, this.f.categorySelect.value, this.f.metropolisesSelect.value]);
  }


}
