/**
 * Modèle représentant une facture
 */
export class Bill {
  /**
   * Identifiant de la facture
   */
  readonly id: number;

  /**
   * Description de la facture
   */
  description: string;

  /**
   * Date de la facture
   */
  billDate: string;

  /**
   * Prix total de la facture
   */
  billPrice: string;

  /**
   * Constructeur de l'objet, tous les paramètres sont obligatoires
   * @param options Contient les paramètres de l'objet
   */
  constructor(options: {
    id: number,
    description: string,
    billDate: string,
    billPrice: string
  }) {
    this.id = options.id;
    this.description = options.description;
    this.billDate = options.billDate;
    this.billPrice = options.billPrice;
  }

  /**
   * Crée une facture à partir d'un flux JSON
   * @param json Les propriétés de la facture contenues dans le flux JSON
   * @returns { Bill } L'objet facture créé
   */
  public static fromJson(json: any): Bill {
    return new Bill({
      id: json.BILL_ID,
      description: json.BILL_DESCRIPTION,
      billDate: json.BILL_DATE,
      billPrice: json.BILL_PRICE
    });
  }

}
