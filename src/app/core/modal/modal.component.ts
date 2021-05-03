import {Component, OnDestroy, OnInit} from '@angular/core';

import { ModalService } from './../services/modal.service';
import {Modal, ModalType} from "../../shared/models/modal.model";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

/**
 * Composant d'affichage des popin
 */
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  /**
   * Types de modal
   */
  modalType = ModalType;

  /**
   * Propriétés de la modal
   */
  modalProperties!: Modal;

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
   * @param modalService Service de gestion des popin
   * @param router Gestion de la navigation natif angular
   */
  constructor(
    private modalService: ModalService,
    private router: Router
  ) { }

  /**
   * Souscrit aux propriétés de la modal pour son affichage
   */
  ngOnInit(): void {
    this.getPropertiesSub = this.modalService.getProperties().subscribe(properties => {
      this.modalProperties = properties;

      if (this.modalProperties && this.modalProperties.redirect.length > 0) {
        this.timeout = setTimeout(() => {
          this.router.navigate([this.modalProperties.redirect]);
          clearTimeout(this.timeout);
          this.modalProperties.close();
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
   * Associe la classe CSS à afficher pour la couleur du titre de la popin
   * @returns La classe CSS correspondante
   */
  getColor(): string {
    switch (this.modalProperties.type) {
      case ModalType.CONFIRMATION:
        return '--brown';
      case ModalType.ERROR:
        return '--red';
      case ModalType.INFORMATION:
        return '--green';
    }
  }

  /**
   * Associe la classe CSS à afficher pour le background de la popin
   * @returns La classe CSS correspondante
   */
  getBgColor(): string {
    switch (this.modalProperties.type) {
      case ModalType.CONFIRMATION:
        return 'bg--brown';
      case ModalType.ERROR:
        return 'bg--red';
      case ModalType.INFORMATION:
        return 'bg--green';
    }
  }

  /**
   * Fermeture de la popin
   */
  action(callback: () => void): void {
    clearTimeout(this.timeout);
    callback;
  }

}
