import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, CanDeactivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {EquipmentSearchProvider} from "../providers/equipment-search.providers";

@Injectable({
  providedIn: 'root'
})

/**
 * Guard permettant ou non l'accès aux pages du parcours de recherche d'équipement
 */
export class EquipmentSearchGuard implements CanActivateChild, CanDeactivate<unknown> {

  /**
   * Nom des routes disponibles
   */
  routesNames = {
    equipmentList: 'equipment-list',
    equipmentDetail: 'equipment-details/:id/:startDate/:endDate'
  };

  /**
   * Constructeur de la guard
   * @param equipmentSearchProvider Sauvegarde les données entrées par l'utilisateur pendant le parcours de recherche
   * @param router Gestion du routing (natif angular)
   */
  constructor(
    private equipmentSearchProvider: EquipmentSearchProvider,
    private router: Router
  ) { }

  /**
   * Fonction déterminant le droit de l'utilisateur à accéder à la route demandée
   * @param childRoute La route demandée par l'utilisateur
   * @param state Utilisé pour la récupération de l'url entier
   * @return true pour accéder à la route, ou une redirection
   */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isProviderOK = true;

    if (childRoute.routeConfig?.path === this.routesNames.equipmentList) {
      isProviderOK = this.equipmentSearchProvider.isFilled();
    }

    return isProviderOK;
  }

  /**
   * Vide le provider avant que l'utilisateur ne quitte le parcours
   * @returns true
   */
  canDeactivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.equipmentSearchProvider.cleanProvider();
    return true;
  }

}
