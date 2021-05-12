import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';

import { Category } from '../../shared/models/category.model';
import { CategoryService } from '../../core/services/category.service';
import { Metropolises } from '../../shared/models/metropolises.model';
import { MetropolisesService } from '../../core/services/metropolises.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';
import locale from 'date-fns/locale/en-US';
import { Search } from '../../shared/models/search.model';

/**
 * Composant de le la recherche
 */
@Component({
  selector: 'app-equipment-search',
  templateUrl: './equipment-search.component.html',
  styleUrls: ['./equipment-search.component.css'],
})
export class EquipmentSearchComponent implements OnInit {
  @Output() searchEmitter: EventEmitter<Search> = new EventEmitter<Search>();
  /**
   * Permet d'attendre que les catégories & les métropoles soient chargées pour afficher la barre de recherch
   */
  categoryAndMetropolisesLoaded: Promise<boolean>;

  /**
   * Liste des catégories
   */
  listCategory$: Observable<Category[]>;

  /**
   * Liste des métropoles
   */
  listMetropolises$: Observable<Metropolises[]>;

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
  errorMessageDate =
    'Erreur : La date de fin ne peux être inférieur à la date de début';

  /**
   * Date du jour
   */
  todayDate = new Date();

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
    private router: Router,
    private fb: FormBuilder
  ) {}

  /**
   * Initialise le composant
   */
  ngOnInit(): void {
    this.initForm();
    this.todayDate.setDate(this.todayDate.getDate() - 1);
    this.startDatePickerOptions.maxDate = this.todayDate;
    this.endDatePickerOptions.maxDate = this.todayDate;
    this.areDatesOk =  true;

    this.areDatesOk = true;
    this.listCategory$ = this.categoryService.getListCategory();
    this.listMetropolises$ = this.metropolisesService.getListMetropolises();
  }

  /**
   * Initialisation du formulaire
   */
  initForm(): void {
    this.searchForm = this.fb.group({
      productName: [''],
      categorySelect: [''],
      metropolisesSelect: [''],
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
        this.areDatesOk = true;
      }
    } else {
      this.areDatesOk = true;
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
   * Fonction créant la recherche, et appellant la liste
   */
  search() {
    if (this.areDatesOk) {
      if (this.f.productName.value === '') {
        this.f.productName.setValue(' ');
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

      if (this.f.categorySelect.value === '') {
        this.f.categorySelect.setValue('0');
      }

      if (this.f.metropolisesSelect.value === '') {
        this.f.metropolisesSelect.setValue('0');
      }

      this._emitSearchObject();
    }
  }

  /**
   * Emission de l'objet de recherche pour le composant parent (trigger la fonction updateList du composant parent)
   */
  private _emitSearchObject() {
    const searchObject: Search = {
      productName: this.f.productName.value,
      startDate: this.formatDate(this.startDateSelect),
      endDate: this.formatDate(this.endDateSelect),
      category: this.f.categorySelect.value,
      metropolises: this.f.metropolisesSelect.value,
    };

    this.searchEmitter.emit(searchObject);
  }
}
