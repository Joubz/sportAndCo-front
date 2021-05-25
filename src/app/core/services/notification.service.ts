import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Notification } from 'src/app/shared/models/notification.model';

/**
 * Service de gestion des popin de notifications
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  /**
   * Le sujet observé par le composant de la popin de notification,
   * contenant les propriétés de la popin de notification à afficher
   */
  private subject = new Subject<any>();

  /**
   * Affecte les propriétés de la popin au subject
   * @param notification Popin à afficher
   */
  genericNotification(notification: Notification): void {
    const that = this;

    this.subject.next({
      background: notification.background,
      icon: notification.icon,
      message: notification.message,
      close:
        function () {
          that.subject.next();
        }
    });
  }

  /**
   * Récupère les propriétés de la popin (subject)
   * @returns Les propriétés de la popin sous forme d'observable
   */
  getProperties(): Observable<any> {
    return this.subject.asObservable();
  }
}
