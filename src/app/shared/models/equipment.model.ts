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
  totalQuantity: string;

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
    category: Category,
    name: string,
    description: string,
    creationDate: string,
    price: string,
    totalQuantity: string,
    availableQuantity: string,
    imageLink: string,
    otherText
  }) {
    this.id = options.id;
    this.renter = options.renter;
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
      renter: Renter.fromJson({id: json.RENTER_ID, metropolises: Metropolises.fromJson({id: json.METROPOLISES_ID, name: json.METROPOLISES_NAME}), companyName: json.COMPANY_NAME,
        lastName: json.LAST_NAME, firstName: json.FIRST_NAME, email: json.EMAIL, phone: json.PHONE, birthDate: json.BIRTH_DATE, address: json.ADDRESS, additionalAddress: json.ADDITIONNAL_ADDRESS,
        postalCode: json.POSTAL_CODE, city: json.CITY, imageLink: json.IMAGE_LINK}),
      category: Category.fromJson({id: json.CATEGORY_ID, name: json.CATEGORY_NAME}),
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
