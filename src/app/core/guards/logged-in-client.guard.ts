import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from "../services/token-storage.service";

/**
 * Guard pour ne pas accéder à la page de connexion client alors qu'on est déjà connecté
 */
@Injectable({
  providedIn: 'root'
})
export class LoggedInClientGuard implements CanActivate {
  /**
   * Constructeur de la guard
   * @param tokenStorageService Service de gestion des tokens
   * @param router Service de navigation natif angular
   */
  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  /**
   * Décide si l'utilisateur peut accéder ou non à la page de connexion administrateur
   * @returns booléen
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (route.data.unloggedClient) {
      if (this.tokenStorageService.getClient().id !== -1) {
        this.router.navigate(['/client-login']);
        return false;
      }

      return true;
    }

    if (this.tokenStorageService.getClient().id === -1) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

}
