import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EquipmentService } from 'src/app/core/services/equipment.service';
import { Equipment } from 'src/app/shared/models/equipment.model';
import { Period } from 'src/app/shared/models/period.model';
import { Search } from 'src/app/shared/models/search.model';

/**
 * Composant de la page d'acceuil
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  /**
   * Liste des équipements
   */
  listEquipment$: Observable<Equipment[]>;

  period: Period;

  /**
   * Constructeur du composant
   * @param equipmentService Service de gestion des équipements
   */
  constructor(private equipmentService: EquipmentService) {}

  /**
   * Souscrit aux propriétés de la modal pour son affichage
   */
  ngOnInit(): void {}

  /**
   * Met à jour la liste des équipement
   * @param searchObject paramètres de la recherche
   */
  updateList(searchObject: Search) {
    this.period = {
      startDate: searchObject.startDate,
      endDate: searchObject.endDate,
    };
    this.listEquipment$ = this.equipmentService.searchEquipment(
      searchObject.productName,
      searchObject.startDate,
      searchObject.endDate,
      parseInt(searchObject.category, 10),
      parseInt(searchObject.metropolises, 10)
    );
  }
}
