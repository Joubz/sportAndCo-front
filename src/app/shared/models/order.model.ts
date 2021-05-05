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
  finishDate: string;

  /**
   * Date de la validation de la commande
   */
  rentDate: string;

  /**
   * Nombre d'équipement commandés
   */
  quantityRented: string;

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
    finishDate: string,
    rentDate: string,
    quantityRented: string
  }) {
    this.id = options.id;
    this.client = options.client;
    this.equipment = options.equipment;
    this.bill = options.bill;
    this.startDate = options.startDate;
    this.finishDate = options.finishDate;
    this.rentDate = options.rentDate;
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
      client: Client.fromJson({id: json.CLIENT_ID, lastName: json.CLIENT_LAST_NAME, firstName: json.CLIENT_FIRST_NAME, email: json.CLIENT_EMAIL,
        phone: json.CLIENT_PHONE, birthDate: json.CLIENT_BIRTH_DATE, address: json.CLIENT_ADDRESS,
        additionalAddress: json.CLIENT_ADDITIONAL_ADDRESS, postalCode: json.CLIENT_POSTAL_CODE, city: json.CLIENT_CITY }),
      equipment: Equipment.fromJson({
        id: json.EQUIPMENT_ID,
        renter: Renter.fromJson({id: json.RENTER_ID, metropolises: Metropolises.fromJson({id: json.METROPOLISES_ID, name: json.METROPOLISES_NAME}), companyName: json.COMPANY_NAME,
          lastName: json.RENTER_LAST_NAME, firstName: json.RENTER_FIRST_NAME, email: json.RENTER_EMAIL, phone: json.PHONE_EMAIL, birthDate: json.RENTER_BIRTH_DATE, address: json.RENTER_ADDRESS,
          additionalAddress: json.RENTER_ADDITIONAL_ADDRESS, postalCode: json.RENTER_POSTAL_CODE, city: json.RENTER_CITY, imageLink: json.IMAGE_LINK}),
        category: Category.fromJson({id: json.CATEGORY_ID, name: json.RENTER_IMAGE_LINK}),
        name: json.EQUIPMENT_NAME,
        description: json.EQUIPMENT_DESCRIPTION,
        creationDate: json.EQUIPMENT_CREATION_DATE,
        price: json.EQUIPMENT_PRICE,
        totalQuantity: json.EQUIPMENT_TOTAL_QUANTITY,
        availableQuantity: json.EQUIPMENT_AVAILABLE_QUANTITY,
        imageLink: json.EQUIPMENT_IMAGE_LINK,
        otherText: json.EQUIPMENT_OTHER_TEXT
      }),
      bill: Bill.fromJson({id: json.BILL_ID, description: json.BILL_DESCRIPTION, billDate: json.BILL_DATE, billPrice: json.BILL_PRICE}),
      startDate: json.START_DATE,
      finishDate: json.FINISH_DATE,
      rentDate: json.RENT_DATE,
      quantityRented: json.QUANTITY_RENTED
    });
  }

}
