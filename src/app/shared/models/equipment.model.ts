import {Renter} from "./renter.model";
import {Category} from "./category.model";
import {Metropolises} from "./metropolises.model";

/**
 * Modèle représentant un équipement
 */
export class Equipment {
  /**
   * Identifiant de l'équipement
   */
  readonly id: number;

  /**
   * Loueur de l'équipement
   */
  renter: Renter;

  /**
   * Catégorie de l'équipement
   */
  category: Category;

  /**
   * Métropole du loueur
   */
  metropolises: Metropolises;

  /**
   * Nom de l'équipement
   */
  name: string;

  /**
   * Description de l'équipement
   */
  description: string;

  /**
   * Date de création
   */
  creationDate: string;

  /**
   * Prix de l'équipement
   */
  price: string;

  /**
   * Quantité au total
   */
  totalQuantity: number;

  /**
   * Quantité restante
   */
  availableQuantity: string;

  /**
   * Lien de l'image
   */
  imageLink: string;

  /**
   * Précision écrite si la catégorie "autre" est sélectionné par le loueur
   */
  otherText: string;

  /**
   * Constructeur de l'objet, tous les paramètres sont obligatoires
   * @param options Contient les paramètres de l'objet
   */
  constructor(options: {
    id: number,
    renter: Renter,
    metropolises: Metropolises,
    category: Category,
    name: string,
    description: string,
    creationDate: string,
    price: string,
    totalQuantity: number,
    availableQuantity: string,
    imageLink: string,
    otherText
  }) {
    this.id = options.id;
    this.renter = options.renter;
    this.metropolises = options.metropolises;
    this.category = options.category;
    this.name = options.name;
    this.description = options.description;
    this.creationDate = options.creationDate;
    this.price = options.price;
    this.totalQuantity = options.totalQuantity;
    this.availableQuantity = options.availableQuantity;
    this.imageLink = options.imageLink;
    this.otherText = options.otherText;
  }

  /**
   * Crée un équipement à partir d'un flux JSON
   * @param json Les propriétés de l'équipement contenues dans le flux JSON
   * @returns { Equipment } L'objet équipement créé
   */
  public static fromJson(json: any): Equipment {
    return new Equipment({
      id: json.EQUIPMENT_ID,
      renter: Renter.fromJson({RENTER_ID: json.RENTER_ID,
        COMPANY_NAME: json.COMPANY_NAME, LAST_NAME: json.LAST_NAME, FIRST_NAME: json.FIRST_NAME, EMAIL: json.EMAIL, PHONE: json.PHONE, BIRTH_DATE: json.BIRTH_DATE, ADDRESS: json.ADDRESS,
        ADDITIONAL_ADDRESS: json.ADDITIONAL_ADDRESS, POSTAL_CODE: json.POSTAL_CODE, CITY: json.CITY, IMAGE_LINK: json.IMAGE_LINK}),
      metropolises: Metropolises.fromJson({METROPOLISES_ID: json.METROPOLISES_ID, METROPOLISES_NAME: json.METROPOLISES_NAME}),
      category: Category.fromJson({CATEGORY_ID: json.CATEGORY_ID, CATEGORY_NAME: json.CATEGORY_NAME}),
      name: json.EQUIPMENT_NAME,
      description: json.DESCRIPTION,
      creationDate: json.CREATION_DATE,
      price: json.PRICE,
      totalQuantity: json.TOTAL_QUANTITY,
      availableQuantity: json.AVAILABLE_QUANTITY,
      imageLink: json.IMAGE_LINK,
      otherText: json.OTHER_TEXT
    });

  }

}
