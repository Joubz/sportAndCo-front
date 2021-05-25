import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Renter} from "../../shared/models/renter.model";
import {RenterService} from "../../core/services/renter.service";
import {environment} from "../../../environments/environment";

/**
 * Composant de la page de liste des loueurs
 */
@Component({
  selector: 'app-renter-list',
  templateUrl: './renter-list.component.html',
  styleUrls: ['./renter-list.component.css']
})
export class RenterListComponent implements OnInit {

  /**
   * Permet d'attendre que la liste des loueurs soit chargée pour l'afficher
   */
  renterListLoaded: Promise<boolean>;

  /**
   * Souscription au service de récupération de la liste des loueurs
   */
  renterListSub: Subscription;

  /**
   * Liste des loueurs
   */
  renterList: Renter[];

  /**
   * url de l'application qui sera passé au HTML de l'image pour chargement de l'image sur le visuel
   */
  urlBasic: string = environment.URL_BASE;

  /**
   * Constructeur du composant
   * @param renterService Service de gestion des loueurs
   */
  constructor(
    private renterService: RenterService,
  ) { }

  ngOnInit(): void {
    this.renterListSub = this.renterService.getRenterList().subscribe(result => {
      this.renterList = result;
      this.renterListLoaded = Promise.resolve(true);
    });
  }

}
