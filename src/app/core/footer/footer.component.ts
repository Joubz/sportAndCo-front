import { Component, OnInit } from '@angular/core';

/**
 * Composant du footer
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

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
