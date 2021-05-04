/**
 * Modèle représentant un administrateur
 */
export class Administrator {
  /**
   * Identifiant de l'administrateur
   */
  readonly id: number;

  /**
   * Nom d'utilisateur de l'administrateur
   */
  username: string;

  /**
   * Mot de passe de l'administrateur
   */
  password: string;

  /**
   * Constructeur de l'objet, tous les paramètres sont obligatoires
   * @param options Contient les paramètres de l'objet
   */
  constructor(option: {
    id: number,
    username: string,
    password: string,
  }) {
    this.id = option.id;
    this.username = option.username;
    this.password = option.password;
  }

  /**
   * Crée un administrateur à partir d'un flux  JSON
   * @param json Les propriétés de l'administrateur contenues dans le flux JSON
   * @returns { Administrator } L'objet administrateur créé
   */
  public static fromJson(json: any): Administrator {
    return new Administrator({
      id: json.id,
      username: json.username,
      password: json.password,
    });
  }
}
