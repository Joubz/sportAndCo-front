import { Injectable } from '@angular/core';
import {Modal} from "../../shared/models/modal.model";
import {Observable, Subject} from "rxjs";

/**
 * Service de gestion des popin
 */
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  /**
   * Le sujet observé par le composant de la popin,
   * contenant les propriétés de la popin à afficher
   */
  private subject = new Subject<any>();

  /**
   * Affecte les propriétés de la popin au subject
   * @param modal Popin à afficher
   */
  genericModal(modal: Modal): void {
    const that = this;

    this.subject.next({
      type: modal.type,
      title: modal.title,
      text: modal.text,
      redirect: modal.redirect,
      close:
        function () {
          that.subject.next();
          modal.close();
        }
    });
  }

  /**
   * Affichage d'une modal de confirmation contenant les fonctions confirm/cancel
   * @param modal La modal de confirmation
   */
  confirmationModal(modal: Modal): void {
    const that = this;

    this.subject.next({
      type: modal.type,
      title: modal.title,
      text: modal.text,
      redirect: modal.redirect,
      confirm:
        function () {
          that.subject.next();
          modal.confirm();
        },
      cancel:
        function () {
          that.subject.next();
          modal.cancel();
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
