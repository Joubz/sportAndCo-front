import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { Notification } from './../../shared/models/notification.model';
import { NotificationsService } from './../services/notification.service';

/**
 * Composant d'affichage des popin de notification
 */
@Component({
  selector: 'app-notifications',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  /**
   * Propriétés de la notification
   */
  notificationProperties!: Notification;

  /**
   * Souscription à l'observable
   */
  getPropertiesSub!: Subscription;

  /**
   * Timeout pour la fermeture de la popin
   */
  timeout: any;

  /**
   * Constructeur du composant
   * @param notificationsService Service de gestion des popin de notification
   */
  constructor(
    private notificationsService: NotificationsService
  ) { }

  /**
   * Souscrit aux propriétés de la notification pour son affichage
   */
  ngOnInit(): void {
    this.getPropertiesSub = this.notificationsService.getProperties().subscribe(properties => {
      this.notificationProperties = properties;

      if (this.notificationProperties) {
        this.timeout = setTimeout(() => {
          clearTimeout(this.timeout);
          properties.close();
        }, 5000);
      }
    });
  }

  /**
   * Unsubscrire l'observable à la destruction du composant
   */
  ngOnDestroy(): void {
    this.getPropertiesSub?.unsubscribe();
  }

  /**
   * Transforme le temps d'affichage en la classe CSS correspondante
   * @param delay Temps d'affichage en secondes
   * @returns La classe correspondant au temps d'affichage demandé
   */
  delayToClass(delay: number): string {
    return 'delay-anim-' + delay;
  }

  /**
   * Fermeture de la popin
   */
  close(): void {
    clearTimeout(this.timeout);
    this.notificationProperties.close();
  }
}
