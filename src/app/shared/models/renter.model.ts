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
  additionnalAddress: string;

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
    isAccepted: boolean,
    companyName: string,
    lastName: string,
    firstName: string,
    email: string,
    birthDate: string,
    address: string,
    additionnalAddress: string,
    postalCode: string,
    city: string
    imageLink: string
  }) {
    this.id = options.id;
    this.password = options.password;
    this.isAccepted = options.isAccepted;
    this.companyName = options.companyName;
    this.lastName = options.lastName;
    this.firstName = options.firstName;
    this.email = options.email;
    this.birthDate = options.birthDate;
    this.address = options.address;
    this.additionnalAddress = options.additionnalAddress;
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
      isAccepted: json.ACCEPTED,
      companyName: json.COMPANY_NAME,
      lastName: json.LAST_NAME,
      firstName: json.FIRST_NAME,
      email: json.EMAIL,
      birthDate: json.BIRTH_DATE,
      address: json.ADDRESS,
      additionnalAddress: json.ADDITIONNAL_ADDRESS,
      postalCode: json.POSTAL_CODE,
      city: json.CITY,
      imageLink: json.IMAGE_LINK
    });
  }

}
