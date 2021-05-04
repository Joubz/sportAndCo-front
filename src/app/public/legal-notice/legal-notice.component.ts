import { Component, OnInit } from '@angular/core';

/**
 * Composant de la page des mentions légales
 */
@Component({
  selector: 'app-legal-notice',
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.css']
})
export class LegalNoticeComponent implements OnInit {

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
