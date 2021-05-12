import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { EquipmentService } from '../../core/services/equipment.service';
import { Equipment } from '../../shared/models/equipment.model';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Search } from 'src/app/shared/models/search.model';
import { map } from 'rxjs/operators';

/**
 * Composant de la liste des équipements
 */
@Component({
  selector: 'app-list-equipment',
  templateUrl: './list-equipment.component.html',
  styleUrls: ['./list-equipment.component.css'],
})
export class ListEquipmentComponent implements OnInit {
  /**
   * Date de début courante
   */
  currentStartDate: string;

  /**
   * Date de fin courante
   */
  currentEndDate: string;

  /**
   * url de l'application qui sera passé au HTML de l'image pour chargement de l'image sur le visuel
   */
  urlBasic: string = environment.URL_BASE;

  /**
   * Les options de critères de tri
   */
  selectOptions = [
    { name: 'Ordre Alphabétique' },
    { name: 'Prix Ascendant' },
    { name: 'Prix Descendant' },
  ];

  /**
   * La valeur de select par défaut
   */
  defaultSelectedOption: string;

  /**
   * Formulaire de sélection des filtres
   */
  filtersForm: FormGroup;

  /**
   * Liste des équipements
   */
  listEquipment$: Observable<Equipment[]>;

  /**
   * Constructeur du composant
   * @param equipmentService Service de gestion des éqyipements
   * @param router Service de gestion des routes
   * @param fb Utilitaire de création de formulaire
   */
  constructor(
    private equipmentService: EquipmentService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  /**
   * Initialise le composant, initiaalise le formulaire
   */
  ngOnInit(): void {
    this.defaultSelectedOption = 'Ordre Alphabétique';
    this.initForm();
  }

  /**
   * Initialisation du formulaire
   */
  initForm(): void {
    this.filtersForm = this.fb.group({
      selectOption: [''],
    });
  }

  /**
   * Trie la liste des équipements en fonction de l'option choisie dans le select
   */
  sortOnChange(): void {
    if (this.defaultSelectedOption === 'Ordre Alphabétique') {
      this.sortListEquipmentsByName();
    } else if (this.defaultSelectedOption === 'Prix Ascendant') {
      this.sortListEquipmentsByPriceAscendant();
    } else if (this.defaultSelectedOption === 'Prix Descendant') {
      this.sortListEquipmentsByPriceDescendant();
    }
  }

  /**
   * Trie la liste des équipements par ordre de prix ascendant
   */
  sortListEquipmentsByPriceAscendant(): void {
    this.listEquipment$ = this.listEquipment$.pipe(
      map((equipments) =>
        equipments.sort((v1: Equipment, v2: Equipment) => {
          return v1.price - v2.price;
        })
      )
    );
  }

  /**
   * Trie la liste des équipements par ordre de prix ascendant
   */
  sortListEquipmentsByPriceDescendant(): void {
    this.listEquipment$ = this.listEquipment$.pipe(
      map((equipments) =>
        equipments.sort((v1: Equipment, v2: Equipment) => {
          return v2.price - v1.price;
        })
      )
    );
  }

  /**
   * Trie la liste des équipements par ordre alphabétique
   */
  sortListEquipmentsByName(): void {
    this.listEquipment$ = this.listEquipment$.pipe(
      map((equipments) =>
        equipments.sort((v1: Equipment, v2: Equipment) => {
          return v1.name.localeCompare(v2.name);
        })
      )
    );
  }

  /**
   * Permet de retourner les controls du formulaire de rendez-vous facilement
   */
  get f() {
    return this.filtersForm.controls;
  }

  /**
   * Redirige vers le détail de l'éauipement
   * @param id identifiant de l'équipement
   */
  goToEquipmentDetails(id: number): void {
    this.router.navigate(
      [
        '/equipment/equipment-details',
        id,
        this.currentStartDate,
        this.currentEndDate,
      ],
      { queryParams: { from: 'equipment-list' } }
    );
  }

  /**
   * Met à jour la liste des équipement
   * @param searchObject paramètres de la recherche
   */
  updateList(searchObject: Search) {
    this._updateDates(searchObject);
    this.listEquipment$ = this.equipmentService.searchEquipment(
      searchObject.productName,
      searchObject.startDate,
      searchObject.endDate,
      parseInt(searchObject.category, 10),
      parseInt(searchObject.metropolises, 10)
    );
    this.sortOnChange();
  }

  /**
   * Met à jour les dates courantes
   * @param searchObject paramètres de la recherche
   */
  private _updateDates(searchObject: Search) {
    this.currentStartDate = searchObject.startDate;
    this.currentEndDate = searchObject.endDate;
  }
}
