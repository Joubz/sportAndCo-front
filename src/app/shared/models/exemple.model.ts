
/**
 * Modèle exemple
 */
export class Exemple {

  /**
   * Identifiant
   */
  readonly id: number;

  /**
   * Titre
   */
  title: string;

  /**
   * Constructeur de l'objet, tous les paramètres sont obligatoires
   * @param options Contient les paramètres de l'objet
   */
  constructor(options: {
    id: number,
    title: string
  }) {
    this.id = options.id;
    this.title = options.title;
  }

  /**
   * Crée un exemple à partir d'un flux JSON
   * @param json Les propriétés de l'exemple contenues dans le flux JSON
   * @returns { Exemple } L'objet exemple créé
   */
  public static fromJson(json: any): Exemple {
    return new Exemple({
      id: json.EXEMPLE_ID,
      title: json.TITLE,
    });
  }
}
