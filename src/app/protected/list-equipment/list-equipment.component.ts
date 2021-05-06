import {Component, OnDestroy, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import {ActivatedRoute, Router} from "@angular/router";

import {EquipmentService} from "../../core/services/equipment.service";
import {OrderService} from "../../core/services/order.service";
import {Equipment} from "../../shared/models/equipment.model";

@Component({
  selector: 'app-list-equipment',
  templateUrl: './list-equipment.component.html',
  styleUrls: ['./list-equipment.component.css']
})
export class ListEquipmentComponent implements OnInit, OnDestroy {

  /**
   * Permet d'attendre que l'équipement soit chargé pour l'afficher
   */
  listEquipmentLoaded: Promise<boolean>;

  /**
   * Liste des équipements correspondant à la recherche de l'utilisateur.
   */
  listEquipment: Equipment[];

  /**
   * url de l'application qui sera passé au HTML de l'image pour chargement de l'image sur le visuel
   */
  urlBasic: string = environment.URL_BASE;

  constructor(private equipmentService: EquipmentService,
              private orderService: OrderService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
