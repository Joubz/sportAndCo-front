/**
* Modèle représentant un équipement
*/
export class Payment {
  /**
   * Identifiant de la carte de paiement
   */
  readonly id: number;

  /**
   * Nom de la carte de paiement
   */
  name: string;

  /**
   * Numéro de la carte de paiement
   */
  number: number;

  /**
   * Date d'expiration de la carte
   */
  expirationDate: string;

  /**
   * Numéro de la carte de paiement
   */
  cvv: number;

  /**
   * Constructeur de l'objet, tous les paramètres sont obligatoires
   * @param options Contient les paramètres de l'objet
   */
  constructor(options: {
    id: number,
    name: string,
    number: number,
    expirationDate: string,
    cvv: number,
  }) {
    this.id = options.id;
    this.name = options.name;
    this.number = options.number;
    this.expirationDate = options.expirationDate;
    this.cvv = options.cvv;
  }
  /**
   * Crée un équipement à partir d'un flux JSON
   * @param json Les propriétés de l'équipement contenues dans le flux JSON
   * @returns { Equipment } L'objet équipement créé
   */
  public static fromJson(json: any): Payment {
    return new Payment({
      id: json.CARD_ID,
      name: json.CARD_NAME,
      number: json.CARD_NUMBER,
      expirationDate: json.EXPIRATION_DATE,
      cvv: json.CVV
    });

  }

}

