import {Client} from "./clientRent.model";
import {Equipment} from "./equipment.model";
import {Bill} from "./bill.model";
import {Renter} from "./renter.model";
import {Category} from "./category.model";
import {Metropolises} from "./metropolises.model";

/**
 * Modèle représentant une commande
 */
export class Order {
  /**
   * Identifiant de la commande
   */
  readonly id: number;

  /**
   * Client de la commande
   */
  client: Client;

  /**
   * Equipement de la commande
   */
  equipment: Equipment;

  /**
   * Facture de la commande
   */
  bill: Bill;

  /**
   * Date de début de location
   */
  startDate: string;

  /**
   * Date de fin de location
   */
  endDate: string;

  /**
   * Date de la validation de la commande
   */
  rentDate: string;

  /**
   * Status indiquant si les équipements de la commandes ont été rendus
   */
  statusRendered: boolean;

  /**
   * Nombre d'équipement commandés
   */
  quantityRented: number;

  /**
   * Constructeur de l'objet, tous les paramètres sont obligatoires
   * @param options Contient les paramètres de l'objet
   */
  constructor(options: {
    id: number,
    client: Client,
    equipment: Equipment,
    bill: Bill,
    startDate: string,
    endDate: string,
    rentDate: string,
    statusRendered: boolean,
    quantityRented: number
  }) {
    this.id = options.id;
    this.client = options.client;
    this.equipment = options.equipment;
    this.bill = options.bill;
    this.startDate = options.startDate;
    this.endDate = options.endDate;
    this.rentDate = options.rentDate;
    this.statusRendered = options.statusRendered;
    this.quantityRented = options.quantityRented;
  }

  /**
   * Crée une commande à partir d'un flux JSON
   * @param json Les propriétés de la commande contenues dans le flux JSON
   * @returns { Order } L'objet commande créé
   */
  public static fromJson(json: any): Order {
    return new Order({
      id: json.ORDER_ID,
      client: Client.fromJson({CLIENT_ID: json.CLIENT_ID, LAST_NAME: json.CLIENT_LAST_NAME, FIRST_NAME: json.CLIENT_FIRST_NAME, EMAIL: json.CLIENT_EMAIL,
        PHONE: json.CLIENT_PHONE, BIRTH_DATE: json.CLIENT_BIRTH_DATE, ADDRESS: json.CLIENT_ADDRESS,
        ADDITIONAL_ADDRESS: json.CLIENT_ADDITIONAL_ADDRESS, POSTAL_CODE: json.CLIENT_POSTAL_CODE, CITY: json.CLIENT_CITY }),
      equipment: Equipment.fromJson({
        EQUIPMENT_ID: json.EQUIPMENT_ID,
        renter: Renter.fromJson({RENTER_ID: json.RENTER_ID, metropolises: Metropolises.fromJson({METROPOLISES_ID: json.METROPOLISES_ID, METROPOLISES_NAME: json.METROPOLISES_NAME}), COMPANY_NAME: json.COMPANY_NAME,
          LAST_NAME: json.RENTER_LAST_NAME, FIRST_NAME: json.RENTER_FIRST_NAME, EMAIL: json.RENTER_EMAIL, PHONE: json.RENTER_PHONE, BIRTH_DATE: json.RENTER_BIRTH_DATE, ADDRESS: json.RENTER_ADDRESS,
          ADDITIONAL_ADDRESS: json.RENTER_ADDITIONAL_ADDRESS, POSTAL_CODE: json.RENTER_POSTAL_CODE, city: json.RENTER_CITY, IMAGE_LINK: json.IMAGE_LINK}),
        category: Category.fromJson({CATEGORY_ID: json.CATEGORY_ID, CATEGORY_NAME: json.RENTER_IMAGE_LINK}),
        EQUIPMENT_NAME: json.EQUIPMENT_NAME,
        DESCRIPTION: json.EQUIPMENT_DESCRIPTION,
        START_DATE: json.EQUIPMENT_START_DATE,
        END_DATE: json.EQUIPMENT_END_DATE,
        PRICE: json.EQUIPMENT_PRICE,
        TOTAL_QUANTITY: json.EQUIPMENT_TOTAL_QUANTITY,
        IMAGE_LINK_1: json.EQUIPMENT_IMAGE_LINK_1,
        IMAGE_LINK_2: json.EQUIPMENT_IMAGE_LINK_2,
        IMAGE_LINK_3: json.EQUIPMENT_IMAGE_LINK_3,
      }),
      bill: Bill.fromJson({BILL_ID: json.BILL_ID, BILL_DESCRIPTION: json.BILL_DESCRIPTION, BILL_DATE: json.BILL_DATE, BILL_PRICE: json.BILL_PRICE}),
      startDate: json.START_DATE,
      endDate: json.END_DATE,
      rentDate: json.RENT_DATE,
      statusRendered: json.STATUS_RENDERED,
      quantityRented: json.QUANTITY_RENTED
    });
  }

}
