import { Component, OnInit, OnDestroy } from '@angular/core';
import { Client } from '../../shared/models/clientRent.model';
import { ClientService } from '../../core/services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

/**
 * Composant de la page de connexion d'un client
 */
@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css'],
})
export class ClientLoginComponent implements OnInit, OnDestroy {
  /**
   * Données du client pour la connexion
   */
  client: Client;

  /**
   * Formulaire d'ajout d'une anomalie
   */
  clientForm: FormGroup;

  /**
   * Status de connexion
   */
  isLogin: boolean;

  /**
   * String pour le message d'erreur de errorDetection
   */
  messageErrorPassword: string;

  /**
   * String pour le message d'erreur de errorDetection
   */
  messageErrorMail: string;

  /**
   * Le formulaire a été soumis
   */
  isSubmit: boolean;

  /**
   * Constructeur du composant
   * @param clientService Service de gestion client
   * @param fb Constructeur de formulaire natif angular
   * @param router Gestion du routing (natif angular)
   */
  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  /**
   * Destruction du composant
   */
  ngOnDestroy(): void {
  }

  /**
   * Initialise le composant
   */
  ngOnInit(): void {
    this.isSubmit = false;
    this.initForm();
  }

  /**
   * Initialisation du formulaire
   */
  initForm(): void {
    this.clientForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(250),
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.maxLength(15)]],
    });
  }

  /**
   * Permet de retourner les controls du formulaire de création d'anomalie facilement
   */
  get f() {
    return this.clientForm.controls;
  }

  /**
   * Détection des erreurs sur les champs
   * @param formField Champs concerné pour la vérification
   * @returns La validité du champ concerné
   */
  errorDetection(formField: string): boolean {
    switch (formField) {
      case 'password': {
        if (
          this.f.password.invalid &&
          (this.f.password.dirty || this.f.password.touched || this.isLogin)
        ) {
          if (this.f.password.errors.required) {
            this.messageErrorPassword = 'Le mot de passe doit être rempli';
            return true;
          } else if (this.f.password.errors.maxlength) {
            this.messageErrorPassword =
              "Le mot de passe doit être d'une longueur maximale de 15 caractères";
            return true;
          }
        }
        break;
      }
      case 'email': {
        if (
          this.f.email.invalid &&
          (this.f.email.dirty || this.f.email.touched || this.isLogin)
        ) {
          if (this.f.email.errors.required) {
            this.messageErrorMail = 'Le champ doit être rempli';
            return true;
          } else if (this.f.email.errors.maxlength) {
            this.messageErrorMail =
              "Le champ doit être d'une longueur maximale de 250 caractères";
            return true;
          } else if (this.f.email.errors.pattern) {
            this.messageErrorMail = 'Le mail doit être valide';
            return true;
          }
        }
        break;
      }
    }
  }

  /**
   * Récupération du nombre de caractères écrits pour le mot de passe
   */
  get passwordChars(): number {
    return this.f.password.value?.length || 0;
  }

  /**
   * Récupération du nombre de caractères écrits pour l'email
   */
  get emailChars(): number {
    return this.f.email.value?.length || 0;
  }

  /**
   * Méthode appelée lors de la soumission du formulaire.
   */
  onSubmit(): void {
    this.isSubmit = true;

    if (!this.f.email.invalid &&
      !this.f.password.invalid) {
      const loginClient = new Client({
        id: -1,
        password: this.f.password.value,
        firstName: '',
        lastName: '',
        email: this.f.email.value,
        phone: '',
        birthDate: '',
        address: '',
        additionalAddress: '',
        postalCode: '',
        city: ''
      });

      this.clientService.loginClient(loginClient).subscribe(
        result => {
          this.tokenStorageService.saveToken(result.token);
          this.tokenStorageService.saveClient(result.client);

          this.router.navigate(['/home']);
        }
      );

    }
  }
}
