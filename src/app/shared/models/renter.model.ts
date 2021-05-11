import {Metropolises} from "./metropolises.model";

/**
 * Modèle représentant un loueur
 */
export class Renter {
  /**
   * Identifiant du loueur
   */
  readonly id: number;

  /**
   * Mot de passe du loueur
   */
  password: string;

  /**
   * Métropole du loueur
   */
  metropolises: Metropolises;

  /**
   * Booleen indiquant si le loueur à été autorisé par l'administrateur à créer des équipements
   */
  isAccepted: boolean;

  /**
   * Nom de l'entreprise du loueur
   */
  companyName: string;

  /**
   * Nom du loueur
   */
  lastName: string;

  /**
   * Prénom du loueur
   */
  firstName: string;

  /**
   * Email du loueur
   */
  email: string;

  /**
   * Numéro de téléphone
   */
  phone: string;

  /**
   * Date de naissance du loueur
   */
  birthDate: string;

  /**
   * Addresse du loueur
   */
  address: string;

  /**
   * Complément d'adresse du loueur
   */
  additionalAddress: string;

  /**
   * Code postal de l'adresse du loueur
   */
  postalCode: string;

  /**
   * Ville du loueur
   */
  city: string;

  /**
   * Lien de l'image
   */
  imageLink: string;

  /**
   * Constructeur de l'objet, tous les paramètres sont obligatoires
   * @param options Contient les paramètres de l'objet
   */
  constructor(options: {
    id: number,
    password: string,
    metropolises: Metropolises,
    isAccepted: number,
    companyName: string,
    lastName: string,
    firstName: string,
    email: string,
    phone: string,
    birthDate: string,
    address: string,
    additionalAddress: string,
    postalCode: string,
    city: string
    imageLink: string
  }) {
    this.id = options.id;
    this.password = options.password;
    this.metropolises = options.metropolises;
    if (options.isAccepted === 0) {
      this.isAccepted = false;
    } else {
      this.isAccepted = true;
    }
    this.companyName = options.companyName;
    this.lastName = options.lastName;
    this.firstName = options.firstName;
    this.email = options.email;
    this.phone = options.phone;
    this.birthDate = options.birthDate;
    this.address = options.address;
    this.additionalAddress = options.additionalAddress;
    this.postalCode = options.postalCode;
    this.city = options.city;
    this.imageLink = options.imageLink;
  }

  /**
   * Crée un loueur à partir d'un flux JSON
   * @param json Les propriétés du loueur contenues dans le flux JSON
   * @returns { Renter } L'objet loueur créé
   */
  public static fromJson(json: any): Renter {
    return new Renter({
      id: json.RENTER_ID,
      password: json.PASSWORD,
      metropolises: Metropolises.fromJson({METROPOLISES_ID: json.METROPOLISES_ID, METROPOLISES_NAME: json.METROPOLISES_NAME}),
      isAccepted: json.ACCEPTED,
      companyName: json.COMPANY_NAME,
      lastName: json.LAST_NAME,
      firstName: json.FIRST_NAME,
      email: json.EMAIL,
      phone: json.PHONE,
      birthDate: json.BIRTH_DATE,
      address: json.ADDRESS,
      additionalAddress: json.ADDITIONAL_ADDRESS,
      postalCode: json.POSTAL_CODE,
      city: json.CITY,
      imageLink: json.IMAGE_LINK
    });
  }

}
