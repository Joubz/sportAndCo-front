import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Modal, ModalType } from 'src/app/shared/models/modal.model';
import { ModalService } from '../services/modal.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Client } from 'src/app/shared/models/clientRent.model';
import {Administrator} from "../../shared/models/administratror.model";
import {Renter} from "../../shared/models/renter.model";

/**
 * Composant du header
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  /**
   * Variable d'identification admin
   */
  isAdmin = false;

  /**
   * Variable d'identification client
   */
  isClient = false;

  /**
   * Variable d'identification loueur
   */
  isRenter = false;

  /**
   * Variable pour stocker les infos du client
   */
  client: Client;

  /**
   * Variable pour stocker les infos du loueur
   */
  renter: Renter;

  /**
   * Variable pour stocker les infos de l'admin
   */
  admin: Administrator;

  /**
   * Constructeur du composant
   * @param router Gestion du routing (natif angular)
   * @param tokenStorageService Service de gestion des tokens
   * @param modalService Service de gestion des pop-in
   */
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private modalService: ModalService
  ) {}

  /**
   * Souscrit aux propriétés de la modal pour son affichage
   */
  ngOnInit(): void {
    this.isClient = this.tokenStorageService.getClient().id !== -1;
    this.isRenter = this.tokenStorageService.getRenter().id !== -1;
    this.isAdmin = this.tokenStorageService.getAdmin().id !== -1;
    if (this.isClient) {
      this.client = this.tokenStorageService.getClient();
    }
    if (this.isRenter) {
      this.renter = this.tokenStorageService.getRenter();
    }
    if (this.isAdmin) {
      this.admin = this.tokenStorageService.getAdmin();
    }
  }

  /**
   * Vérifie l'état de connexion du client
   */
  ngDoCheck(): void {
    this.isClient = this.tokenStorageService.getClient().id !== -1;
    this.isRenter = this.tokenStorageService.getRenter().id !== -1;
    this.isAdmin = this.tokenStorageService.getAdmin().id !== -1;
    if (this.isClient) {
      this.client = this.tokenStorageService.getClient();
    }
    if (this.isRenter) {
      this.renter = this.tokenStorageService.getRenter();
    }
    if (this.isAdmin) {
      this.admin = this.tokenStorageService.getAdmin();
    }
  }

  /**
   * Fonction de déconnexion, avec pop-in de confirmation
   */
  disconnect(): void {
    const confirmationModal = new Modal({
      title: 'Confirmation',
      text: 'Êtes-vous sûr de vouloir vous déconnectez ?',
      type: ModalType.CONFIRMATION,
    });

    confirmationModal.confirm = () => {
      this.tokenStorageService.logOut();

      const successModal = new Modal({
        title: 'Succès',
        text: 'Vous êtes bien déconnecté',
        type: ModalType.INFORMATION,
        redirect: 'home',
        close: () => {
          this.router.navigate([successModal.redirect]);
        },
      });
      this.modalService.genericModal(successModal);
    };
    this.modalService.confirmationModal(confirmationModal);
  }


}
