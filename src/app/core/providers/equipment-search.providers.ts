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
    isFilled: boolean
    productName: string,
    startDate: string,
    endDate: string,
    category: string,
    metropolises: string
  } = {
    isFilled: false,
    productName: null,
    startDate: null,
    endDate: null,
    category: null,
    metropolises: null
  };

  /**
   * Retourne l'état de remplissage du provider
   * @return isFilled l'état de remplissage
   */
  isFilled(): boolean {
    return this.searchFields.isFilled;
  }

  /**
   * Vider le provider
   */
  cleanProvider(): void {
    this.searchFields = {
      isFilled: false,
      productName: null,
      startDate: null,
      endDate: null,
      category: null,
      metropolises: null
    };
  }

}
