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
   * Variable d'identification admin
   */
    isAdmin = false;

   /**
   * Variable d'identification client
   */
    isClient = false;

    /**
   * Variable d'identification loueur 
   */
   isRenter = false;
  
  
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
