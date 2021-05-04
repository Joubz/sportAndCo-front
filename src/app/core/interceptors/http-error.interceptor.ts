import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from "rxjs/operators";

import {Modal, ModalType} from "../../shared/models/modal.model";
import { ModalService } from './../services/modal.service';
import {RequestsProvider} from "../providers/requests.providers";


/**
 * Intercepteur de requêtes HTTP permettant de gérer les erreurs retournées par l'API Sport & Co
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  /**
   * Récupère les services nécessaires
   * @param modalService Service de gestion des popin
   * @param router Service de gestion des routes
   * @param requestsProvider Provider des requetes
   */
  constructor(
    private modalService: ModalService,
    private router: Router,
    private requestsProvider: RequestsProvider
  ) { }

  /**
   * Intercepte les réponses en provenant du serveur
   * @param request La requête sortante/entrante
   * @param next Passe la main à l'intercepteur suivant
   * @returns Un observable contenant l'erreur reçue ou la réponse de l'API
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.requestsProvider.requestInProgress = true;

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.requestsProvider.requestInProgress = null;
        }

        return event;
      }),
      catchError((err, caught) => {
        this.requestsProvider.requestInProgress = null;

        const errorModal = new Modal({
          type: ModalType.ERROR,
          title: 'Erreur',
          text: err.error?.message || 'Le service est actuellement indisponible, merci de réessayer plus tard.'
        });

        errorModal.close = () => {
          if (err.status === 500 || !err.error.message) {
            this.router.navigate(['/']);
          }
        };

        this.modalService.genericModal(errorModal);

        return throwError(err);
      })
    );
  }
}

/**
 * Export de l'intercepteur pour les providers du CoreModule
 */
export const httpErrorInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
];

