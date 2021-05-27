/**
 * Modèle de métropole : Bordelaise, Parisienne...
 */
export class Metropolises {
  /**
   * Id de la métropole
   */
  readonly id: number;

  /**
   * Nom de la métropole : Bordelaise, Parisienne...
   */
  name: string;

  /**
   * Constructeur de l'objet, tous les paramètres sont obligatoires
   * @param options Contient les paramètres de l'objet
   */
  constructor(options: {
    id: number,
    name: string,
  }) {
    this.id = options.id;
    this.name = options.name;
  }

  /**
   * Crée une métropole à partir d'un flux  JSON
   * @param json Les propriétés  de la métropole contenues dans le flux JSON
   * @returns Metropolises L'objet de la métropole créé
   */
  public static fromJson(json: any): Metropolises {
    return new Metropolises({
      id: json.METROPOLISES_ID,
      name: json.METROPOLISES_NAME,
    });
  }
}
