import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Equipment } from '../../shared/models/equipment.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Search } from 'src/app/shared/models/search.model';
import { Period } from 'src/app/shared/models/period.model';

/**
 * Composant de la liste des équipements
 */
@Component({
  selector: 'app-list-equipment',
  templateUrl: './list-equipment.component.html',
  styleUrls: ['./list-equipment.component.css'],
})
export class ListEquipmentComponent implements OnInit, OnChanges {
  /**
   * Liste des équipements
   */
  @Input() listEquipment: Equipment[];

  /**
   * Contient la date de début et de fin des paramètres de recherche
   */
  @Input() period: Period;

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
   * Constructeur du composant
   * @param router Service de gestion des routes
   * @param fb Utilitaire de création de formulaire
   */
  constructor(private router: Router, private fb: FormBuilder) {}

  /**
   * Initialise le composant, initiaalise le formulaire
   */
  ngOnInit(): void {
    this.defaultSelectedOption = 'Ordre Alphabétique';
    this.initForm();
  }

  /**
   * Se lance à l'initialisation et à chaque fois qu'un @Input est modifié (voir lifecycle hooks sur la doc Angular pour + d'infos)
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.period &&
      changes.period.previousValue !== changes.period.currentValue
    ) {
      this._updateDates();
    }

    if (this.listEquipment) {
      this.sortOnChange();
    }
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
    this.listEquipment = this.listEquipment.sort(
      (v1: Equipment, v2: Equipment) => {
        return v1.price - v2.price;
      }
    );
  }

  /**
   * Trie la liste des équipements par ordre de prix ascendant
   */
  sortListEquipmentsByPriceDescendant(): void {
    this.listEquipment = this.listEquipment.sort(
      (v1: Equipment, v2: Equipment) => {
        return v2.price - v1.price;
      }
    );
  }

  /**
   * Trie la liste des équipements par ordre alphabétique
   */
  sortListEquipmentsByName(): void {
    this.listEquipment = this.listEquipment.sort(
      (v1: Equipment, v2: Equipment) => {
        return v1.name.localeCompare(v2.name);
      }
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
   * Met à jour les dates courantes
   */
  private _updateDates() {
    this.currentStartDate = this.period.startDate;
    this.currentEndDate = this.period.endDate;
  }
}
