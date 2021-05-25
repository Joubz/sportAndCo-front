import {Component, OnDestroy, OnInit} from '@angular/core';
import {Renter} from "../../shared/models/renter.model";
import {RenterService} from "../../core/services/renter.service";
import {Subscription} from "rxjs";
import {Modal, ModalType} from "../../shared/models/modal.model";
import {ModalService} from "../../core/services/modal.service";

/**
 * Composant de la page d'acceptation des loueurs
 */
@Component({
  selector: 'app-accept-renter',
  templateUrl: './accept-renter.component.html',
  styleUrls: ['./accept-renter.component.css']
})
export class AcceptRenterComponent implements OnInit, OnDestroy {
  /**
   * Permet d'attendre que la liste des loueurs non acceptés soit chargée pour l'afficher
   */
  acceptRenterLoaded: Promise<boolean>;

  /**
   * Souscription au service de récupération de la liste des loueurs non acceptés
   */
  acceptRenterSub: Subscription;

  /**
   * Liste des loueurs non acceptés
   */
  renterList: Renter[];

  /**
   * Constructeur du composant
   * @param renterService Service de gestion des loueurs
   * @param modalService Service de gestion des pop-in
   */
  constructor(
    private renterService: RenterService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.acceptRenterSub = this.renterService.getNotAcceptList().subscribe(result => {
      this.renterList = result;
      this.acceptRenterLoaded = Promise.resolve(true);
    });
  }

  /**
   * Unsubscribe
   */
  ngOnDestroy(): void {
    this.acceptRenterSub?.unsubscribe();
  }

  /**
   * Fonction permettant d'accepter un loueur
   * @param renter Loueur à accepter
   * @param index Index dans la liste
   */
  acceptRenter(renter: Renter, index: number): void {
    const confirmationModal = new Modal({
      title: 'Confirmation',
      text: 'Êtes-vous sûr de vouloir accepter ce loueur ?',
      type: ModalType.CONFIRMATION,
    });

    confirmationModal.confirm = () => {
      this.renterService.acceptRenter(renter.id, renter).subscribe(result => {
        const successModal = new Modal({
          title: 'Succès',
          text: 'Vous avez bien accepté ce loueur',
          type: ModalType.INFORMATION,
          redirect: 'home',
          close: () => {
            this.renterList.splice(index, 1);
          },
        });
        this.modalService.genericModal(successModal);
      });
    };
    this.modalService.confirmationModal(confirmationModal);
  }

  /**
   * Fonction permettant de supprimer un loueur
   * @param renterId loueur à supprimer
   * @param index Index dans la liste
   */
  deleteRenter(renter: Renter, index: number): void {
    const confirmationModal = new Modal({
      title: 'Confirmation',
      text: 'Êtes-vous sûr de vouloir supprimer ce loueur ?',
      type: ModalType.CONFIRMATION,
    });

    confirmationModal.confirm = () => {
      this.renterService.deleteRenter(renter.id, renter).subscribe(result => {
        const successModal = new Modal({
          title: 'Succès',
          text: 'Vous avez bien supprimé ce loueur',
          type: ModalType.INFORMATION,
          redirect: 'home',
          close: () => {
            this.renterList.splice(index, 1);
          },
        });
        this.modalService.genericModal(successModal);
      });
    };
    this.modalService.confirmationModal(confirmationModal);
  }


}
