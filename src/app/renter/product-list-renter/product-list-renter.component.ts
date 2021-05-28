import { Component, OnInit } from '@angular/core';
import { RenterService } from 'src/app/core/services/renter.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { Equipment } from 'src/app/shared/models/equipment.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list-renter',
  templateUrl: './product-list-renter.component.html',
  styleUrls: ['./product-list-renter.component.css']
})
export class ProductListRenterComponent implements OnInit {

  /**
   * Récupère la liste des équipements
   */
  listEquipment: Equipment[];

  /**
   * Variable de controle identité renter
   */
  isRenter = false;

  /**
   * Id du renter connecté
   */
  idRenter = -1;

  /**
   * Permet d'attendre que la liste soit chargée
   */
  listEquipmentLoaded: Promise<boolean>;

  /**
   * url de l'application qui sera passé au HTML de l'image pour chargement de l'image sur le visuel
   */
   urlBasic: string = environment.URL_BASE;


  constructor(
    private renterService: RenterService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.idRenter = this.tokenStorageService.getRenter().id;
    // this.idRenter = 49;
    this.renterService.getEquipmentByRenter(this.idRenter).subscribe (result => {
      this.listEquipment = result;
      this.listEquipmentLoaded = Promise.resolve(true);
    })
  }

}
