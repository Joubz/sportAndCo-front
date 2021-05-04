/**
 * Modèle de catégorie d'équipement : sport d'hiver, intérieur, autre...
 */
export class Category {
  /**
   * Id de la catégorie d'équipement
   */
  readonly id: number;

  /**
   * Nom de la catégorie d'équipement : sport d'hiver, intérieur, autre..
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
   * Crée une catégorie d'équipement à partir d'un flux  JSON
   * @param json Les propriétés  de la catégorie d'équipement contenues dans le flux JSON
   * @returns { Category } L'objet de la catégorie d'équipement créé
   */
  public static fromJson(json: any): Category {
    return new Category({
      id: json.CATEGORY_ID,
      name: json.CATEGORY_NAME,
    });
  }
}
