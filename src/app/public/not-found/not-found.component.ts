import { Component, OnInit } from '@angular/core';

/**
 * Composant de la page 404 - Page non trouvée
 */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  /**
   * Constructeur du composant
   */
  constructor() { }

  /**
   * Initialise le composant
   */
  ngOnInit(): void {
  }

}
