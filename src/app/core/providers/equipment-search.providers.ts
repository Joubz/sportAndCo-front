import { Injectable } from '@angular/core';

/**
 * Provider pour la sauvegarde de la recharche des équipments à afficher côté utilisateur
 */
@Injectable({
  providedIn: 'root'
})
export class EquipmentSearchProvider {

  /**
   * Champs de la recherche à afficher
   */
  searchFields: {
    productName: string,
    startDate: string,
    endDate: string,
    category: string,
    metropolises: string
  } = {
    productName: null,
    startDate: null,
    endDate: null,
    category: null,
    metropolises: null
  };

  /**
   * Vider le provider
   */
  cleanProvider(): void {
    this.searchFields = {
      productName: null,
      startDate: null,
      endDate: null,
      category: null,
      metropolises: null
    };
  }

}
