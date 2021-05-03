import { Injectable } from '@angular/core';

/**
 * Provider permettant de propager des informations de requêtes à toute l'application
 */
@Injectable({
  providedIn: 'root'
})
export class RequestsProvider {
  /**
   * Une requête est-elle en cours ?
   */
  requestInProgress = null;
}
