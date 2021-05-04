import { Component, OnInit } from '@angular/core';

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
   */
  constructor() { }

  /**
   * Souscrit aux propriétés de la modal pour son affichage
   */
  ngOnInit(): void {
  }

}
