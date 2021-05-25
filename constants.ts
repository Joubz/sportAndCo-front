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
    EXEMPLE: '/exemple',
    EQUIPMENT: '/equipment',
    ORDER: '/order',
    CATEGORY: '/category',
    METROPOLISES: '/metropolises',
    PAYMENT : '/payment',
    CLIENT: '/client'
  });

  /**
   * Cryptage
   */
  public CRYPT = Object.freeze({
    MDP_CRYPTAGE: "ProjetTocMdp"
  });
}
