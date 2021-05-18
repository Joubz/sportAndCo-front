/**
 * Modèle représentant un client
 */
export class Client {
  /**
   * Identifiant du client
   */
  readonly id: number;

  /**
   * Mot de passe du client
   */
  password: string;

  /**
   * Nom du client
   */
  lastName: string;

  /**
   * Prénom du client
   */
  firstName: string;

  /**
   * Email du client
   */
  email: string;

  /**
   * Numéro de téléphone
   */
  phone: string;

  /**
   * Date de naissance du client
   */
  birthDate: string;

  /**
   * Addresse du client
   */
  address: string;

  /**
   * Complément d'adresse du client
   */
  additionalAddress: string;

  /**
   * Code postal de l'adresse du client
   */
  postalCode: string;

  /**
   * Ville du client
   */
  city: string;

  /**
   * Constructeur de l'objet, tous les paramètres sont obligatoires
   * @param options Contient les paramètres de l'objet
   */
  constructor(options: {
    id: number,
    password: string,
    lastName: string,
    firstName: string,
    email: string,
    phone: string,
    birthDate: string,
    address: string,
    additionalAddress: string,
    postalCode: string,
    city: string
  }) {
    this.id = options.id;
    this.password = options.password;
    this.lastName = options.lastName;
    this.firstName = options.firstName;
    this.email = options.email;
    this.phone = options.phone;
    this.birthDate = options.birthDate;
    this.address = options.address;
    this.additionalAddress = options.additionalAddress;
    this.postalCode = options.postalCode;
    this.city = options.city;
  }

  /**
   * Crée un loueur à partir d'un flux JSON
   * @param json Les propriétés du client contenues dans le flux JSON
   * @returns { Client } L'objet client créé
   */
  public static fromJson(json: any): Client {
    return new Client({
      id: json.CLIENT_ID,
      password: json.PASSWORD,
      lastName: json.LAST_NAME,
      firstName: json.FIRST_NAME,
      email: json.EMAIL,
      phone: json.PHONE,
      birthDate: json.BIRTH_DATE,
      address: json.ADDRESS,
      additionalAddress: json.ADDITIONAL_ADDRESS,
      postalCode: json.POSTAL_CODE,
      city: json.CITY,
    });
  }

   /**
   * Crée un loueur à partir d'un flux JSON
   * @param json Les propriétés du client contenues dans le flux JSON
   * @returns { Client } L'objet client créé
   */
    public static fromJsonToken(json: any): Client {
      return new Client({
        id: json.id,
        password: json.password,
        lastName: json.lastName,
        firstName: json.firstName,
        email: json.email,
        phone: json.phone,
        birthDate: json.birthDate,
        address: json.address,
        additionalAddress: json.additionalAddress,
        postalCode: json.postalCode,
        city: json.city
      });

    }

}

