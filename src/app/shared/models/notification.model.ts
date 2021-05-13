/**
 * Enum des couleurs disponibles pour la popin de notification
 */
export enum NotificationBackground {
  GREEN = 'bg--green'
}

/**
 * Enum des icônes disponibles
 */
export enum NotificationIcon {
  CHECK = 'fas fa-check-circle'
}

/**
 * Objet représentant une popin de notification
 */
export class Notification {

  /**
   * Texte principal à afficher
   */
  message: string;

  /**
   * Couleur de background (classe bg--color)
   */
  background: NotificationBackground;

  /**
   * Balise font-awesome pour l'icône (fas-fa-icon)
   */
  icon: string;

  /**
   * Fonction de fermeture de la popin de notification
   */
  close: () => void;

  /**
   * Constructeur de la notification
   * @param options Contient les paramètres de l'objet
   */
  constructor(options: {
    message: string,
    background: NotificationBackground,
    icon: NotificationIcon,
    close?: () => void
  }) {
    this.message = options.message;
    this.background = options.background;
    this.icon = options.icon;
    this.close = options.close || function() { };
  }
}
