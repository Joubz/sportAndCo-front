import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

/**
 * Composant de la page d'acceuil
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * Constructeur du composant
   * @param router Utilitaire natif angular de navigation
   */
  constructor(
    private router: Router
  ) { }

  /**
   * Souscrit aux propriétés de la modal pour son affichage
   */
  ngOnInit(): void {
  }

  /**
   * méthode pour aller au détails
   */
  goToDetailTest(): void {
    this.router.navigate(['/equipment/equipment-details', 1]);
  }

  /**
   * méthode pour aller au résultats de la recherche/liste des équipments
   */
  goToListeEquipments(): void {
    this.router.navigate(['/equipment/getListEquipment']);
  }
}
