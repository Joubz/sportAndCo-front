import { Component, OnInit } from '@angular/core';

/**
 * Composant du header
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
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