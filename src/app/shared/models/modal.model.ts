/**
 * Enumération des types de pop-in
 */
export enum ModalType {
  ERROR,
  INFORMATION,
  CONFIRMATION,
}

/**
 * Objet représentant une pop-in
 */
export class Modal {

  /**
   * Type de la modal
   */
  type: ModalType;

  /**
   * Titre de la modal
   */
  title: string;

  /**
   * Texte principal à afficher
   */
  text: string;

  /**
   * Valorisé avec l'url de retour si une redirection est demandée
   */
  redirect: string;

  /**
   * Fonction à exécuter au clic sur le bouton "Confirmer"
   */
  confirm: () => void;

  /**
   * Fonction à exécuter au clic sur le bouton "Annuler"
   */
  cancel: () => void;

  /**
   * Fonction à exécuter au clic sur le bouton "Fermer"
   */
  close: () => void;

  /**
   * Constructeur de la modal
   * @param options Paramètres de la modal
   */
  constructor(options: {
    type: ModalType,
    title: string,
    text: string,
    redirect?: string,
    confirm?: () => void,
    cancel?: () => void,
    close?: () => void
  }) {
    this.type = options.type;
    this.title = options.title;
    this.text = options.text;

    this.redirect = options.redirect || '';

    this.confirm = options.confirm || function() { };
    this.cancel = options.cancel || function() { };
    this.close = options.close || function() { };
  }
}
