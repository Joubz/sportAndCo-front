import { Injectable } from '@angular/core';

/**
 * Liste des constantes de l'application
 */
@Injectable({
  providedIn: 'root'
})
export class Constants {

  /**
   * exemple
   */
  public EXEMPLE = Object.freeze({
    exemple1: 'exemple 1',
    exemple2: 'exemple 2'
  });
}
