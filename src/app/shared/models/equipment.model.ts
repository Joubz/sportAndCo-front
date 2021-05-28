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
   * Date de début de location pour produit
   */
  startDate: string;

  /**
   * Date de fin de location pour produit
   */
  endDate: string;

  /**
   * Prix de l'équipement
   */
  price: number;

  /**
   * Quantité au total
   */
  totalQuantity: number;

  /**
   * Lien de l'image N°1
   */
  imageLink1: string;

  /**
   * Lien de l'image N°2
   */
  imageLink2: string;

  /**
   * Lien de l'image N°3
   */
  imageLink3: string;

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
    startDate: string,
    endDate: string,
    price: number,
    totalQuantity: number,
    imageLink1: string,
    imageLink2: string,
    imageLink3: string
  }) {
    this.id = options.id;
    this.renter = options.renter;
    this.metropolises = options.metropolises;
    this.category = options.category;
    this.name = options.name;
    this.description = options.description;
    this.startDate = options.startDate;
    this.endDate = options.endDate;
    this.price = options.price;
    this.totalQuantity = options.totalQuantity;
    this.imageLink1 = options.imageLink1;
    this.imageLink2 = options.imageLink2;
    this.imageLink3 = options.imageLink3;
  }

  /**
   * Crée un équipement à partir d'un flux JSON
   * @param json Les propriétés de l'équipement contenues dans le flux JSON
   * @returns Equipment L'objet équipement créé
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
      startDate: json.START_DATE,
      endDate: json.END_DATE,
      price: json.PRICE,
      totalQuantity: json.TOTAL_QUANTITY,
      imageLink1: json.IMAGE_LINK_1,
      imageLink2: json.IMAGE_LINK_2,
      imageLink3: json.IMAGE_LINK_3
    });

  }

  public static fromJsonInOrder(json: any): Equipment {
    return new Equipment({
      id: json.EQUIPMENT_ID,
      renter: Renter.fromJson({RENTER_ID: json.renter.RENTER_ID,
        COMPANY_NAME: json.renter.COMPANY_NAME, LAST_NAME: json.renter.LAST_NAME, FIRST_NAME: json.renter.FIRST_NAME, EMAIL: json.renter.EMAIL, PHONE: json.renter.PHONE, BIRTH_DATE: json.renter.BIRTH_DATE, ADDRESS: json.renter.ADDRESS,
        ADDITIONAL_ADDRESS: json.renter.ADDITIONAL_ADDRESS, POSTAL_CODE: json.renter.POSTAL_CODE, CITY: json.renter.CITY, IMAGE_LINK: json.renter.IMAGE_LINK}),
      metropolises: Metropolises.fromJson({METROPOLISES_ID: json.METROPOLISES_ID, METROPOLISES_NAME: json.METROPOLISES_NAME}),
      category: Category.fromJson({CATEGORY_ID: json.category.CATEGORY_ID, CATEGORY_NAME: json.category.CATEGORY_NAME}),
      name: json.EQUIPMENT_NAME,
      description: json.DESCRIPTION,
      startDate: json.START_DATE,
      endDate: json.END_DATE,
      price: json.PRICE,
      totalQuantity: json.TOTAL_QUANTITY,
      imageLink1: json.IMAGE_LINK_1,
      imageLink2: json.IMAGE_LINK_2,
      imageLink3: json.IMAGE_LINK_3
    });

  }

}
