import { Injectable } from '@angular/core';

/**
 * Liste des constantes de l'application
 */
@Injectable({
  providedIn: 'root'
})
export class Constants {
  /**
   * Points d'entrée de l'API Sport & Co
   */
  public API_ENDPOINTS = Object.freeze({
    // Utilisation GET, POST, PUT, DELETE
    EXEMPLE: '/exemple'
  });

  /**
   * exemple
   */
  public EXEMPLE = Object.freeze({
    exemple1: 'exemple 1',
    exemple2: 'exemple 2'
  });
}
