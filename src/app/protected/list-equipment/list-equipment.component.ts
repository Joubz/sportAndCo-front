import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import {ActivatedRoute, Router} from "@angular/router";
import { firstBy } from 'thenby';

import {EquipmentService} from "../../core/services/equipment.service";
import {OrderService} from "../../core/services/order.service";
import {Equipment} from "../../shared/models/equipment.model";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

/**
 * Composant de la liste des équipements
 */
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
   * Liste des équipements correspondants à la recherche de l'utilisateur
   */
  listEquipment: Equipment[];

  /**
   * Souscription au service de récupération de la liste des équipements
   */
  getListEquipmentSub: Subscription;

  /**
   * Le nom du produit passé dans la recherche
   */
   productName = this.route.snapshot.paramMap.get('equipmentName');

  /**
   * Date de début sélectionnée par le client
   */
   startDateSelect = this.route.snapshot.paramMap.get('startDate');

  /**
   * Date de fin sélectionnée par le client
   */
   endDateSelect = this.route.snapshot.paramMap.get('endDate');

  /**
   * L'id de la catégorie indiqué dans la recherche
   */
  categoryId = this.route.snapshot.paramMap.get('categoryId');

  /**
   * L'id de la catégorie indiqué dans la recherche
   */
   metropolisesId = this.route.snapshot.paramMap.get('metropolisesId');

  /**
   * url de l'application qui sera passé au HTML de l'image pour chargement de l'image sur le visuel
   */
  urlBasic: string = environment.URL_BASE;

  /**
   * Les options de critères de tri
   */
  selectOptions = [
    { name: 'Ordre Alphabétique' },
    { name: 'Prix Ascendant' },
    { name: 'Prix Descendant' }
  ];

  /**
   * La valeur de select par défaut
   */
  defaultSelected = "Ordre Alphabétique";

  /**
   * Formulaire de sélection des filtres
   */
  filtersForm: FormGroup;

  /**
   * Constructeur du composant
   * @param equipmentService Service de gestion des éqyipements
   * @param orderService Service de gestion des commandes
   * @param router Service de gestion des routes
   * @param route Service angular de gestion de la route actuelle
   * @param fb Utilitaire de création de formulaire
   */
  constructor(
    private equipmentService: EquipmentService,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  /**
   * Initialise le composant, récupère la liste des équipements correspondant à la recherche
   */
  ngOnInit(): void {
    if (this.productName === "") {
      this.productName = " ";
    }

    this.getListEquipmentSub = this.equipmentService.searchEquipment(this.productName, this.startDateSelect, this.endDateSelect, parseInt(this.categoryId, 10), parseInt(this.metropolisesId, 10)).subscribe(listEquipment => {
      this.listEquipment = listEquipment;
      this.listEquipment.sort((a, b) => a.name.localeCompare(b.name));
      this.initForm();
      this.listEquipmentLoaded = Promise.resolve(true);
    });

  }

  /**
   * Initialisation du formulaire
   */
  initForm(): void {
    this.filtersForm = this.fb.group({
      selectOption: ['']
    });
  }

  /**
   * Trie la liste des équipements en fonction de l'option choisie dans le select
   */
  sortOnChange(option: string): void{
    switch (option) {
      case "selectOption":
        if (this.f.selectOption.value === "Ordre Alphabétique"){
          this.sortListEquipmentsByName();
        }
        else if (this.f.selectOption.value === "Prix Ascendant" ){
          this.sortListEquipmentsByPriceAscendant();
        }
        else if (this.f.selectOption.value === "Prix Descendant" ){
          this.sortListEquipmentsByPriceDescendant();
        }
        break;
    }
  }

  /**
   * Trie la liste des équipements par ordre de prix ascendant
   */
   sortListEquipmentsByPriceAscendant(): void {
    this.listEquipment.sort(
      firstBy(function(v1: Equipment, v2: Equipment) { return v1.price - v2.price; }));
  }

  /**
   * Trie la liste des équipements par ordre de prix ascendant
   */
  sortListEquipmentsByPriceDescendant(): void {
    this.listEquipment.sort(
      firstBy(function(v1: Equipment, v2: Equipment) { return v2.price - v1.price; }));
  }

  /**
   * Trie la liste des équipements par ordre alphabétique
   */
  sortListEquipmentsByName(): void {
    this.listEquipment.sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Permet de retourner les controls du formulaire de rendez-vous facilement
   */
  get f() {
    return this.filtersForm.controls;
  }

  /**
   * Unsubscribe
   */
   ngOnDestroy(): void {
    this.getListEquipmentSub?.unsubscribe();
  }

  /**
   * Redirige vers le détail de l'éauipement
   * @param id identifiant de l'équipement
   */
  goToEquipmentDetails(id: number): void {
    if (this.productName === " ") {
      this.productName = "";
    }
    this.router.navigate(['/equipment/equipment-details', id, this.startDateSelect, this.endDateSelect],
      { queryParams: { from: 'equipment-list/' + this.productName + "/" + this.startDateSelect  + "/" + this.endDateSelect  + "/" + this.categoryId  + "/" + this.metropolisesId } });
  }

}
