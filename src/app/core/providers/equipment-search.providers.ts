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
   * Remplis le provider
   * @param productName Le nom du produit cherché
   * @param startDate La date de début de location voulue
   * @param endDate La date de fin de location voulue
   * @param category La catégorie voulue
   * @param metropolises La métropole voulue
   */
  fillProvider(productName: string, startDate: string, endDate: string, category: string, metropolises: string ): void {
    this.searchFields.isFilled = true;
    this.searchFields.productName = productName;
    this.searchFields.startDate = startDate;
    this.searchFields.endDate = endDate;
    this.searchFields.category = category;
    this.searchFields.metropolises = metropolises;
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
