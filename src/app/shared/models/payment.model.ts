import {Client} from "./clientRent.model";

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
  cardName: string;

  /**
   * Numéro de la carte de paiement
   */
  cardNumber: string;

  /**
   * Date d'expiration de la carte
   */
  expirationDate: string;

  /**
   * Numéro de la carte de paiement
   */
  CVV: string;

  /**
   * Client qui possède la carte de crédit
   */
  client: Client;

  /**
   * Constructeur de l'objet, tous les paramètres sont obligatoires
   * @param options Contient les paramètres de l'objet
   */
  constructor(options: {
    id: number,
    cardName: string,
    cardNumber: string,
    expirationDate: string,
    CVV: string,
  }) {
    this.id = options.id;
    this.cardName = options.cardName;
    this.cardNumber = options.cardNumber;
    this.expirationDate = options.expirationDate;
    this.CVV = options.CVV;
  }
  /**
   * Crée un équipement à partir d'un flux JSON
   * @param json Les propriétés de l'équipement contenues dans le flux JSON
   * @returns Equipment L'objet équipement créé
   */
  public static fromJson(json: any): Payment {
    return new Payment({
      id: json.CARD_ID,
      cardName: json.CARD_NAME,
      cardNumber: json.CARD_NUMBER,
      expirationDate: json.EXPIRATION_DATE,
      CVV: json.CVV
    });

  }

}

