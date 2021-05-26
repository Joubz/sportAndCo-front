import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Administrator} from "../../shared/models/administratror.model";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../core/services/token-storage.service";
import {AdministratorService} from "../../core/services/administrator.service";

/**
 * Composant de la page de connexion d'un admin
 */
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit, OnDestroy {
  /**
   * Données du client pour la connexion
   */
  admin: Administrator;

  /**
   * Formulaire d'ajout d'une anomalie
   */
  adminForm: FormGroup;

  /**
   * Status de connexion
   */
  isLogin: boolean;

  /**
   * String pour le message d'erreur de errorDetection
   */
  messageErrorLogin: string;

  /**
   * String pour le message d'erreur de errorDetection
   */
  messageErrorPassword: string;

  /**
   * Le formulaire a été soumis
   */
  isSubmit: boolean;

  /**
   * Constructeur du composant
   * @param adminService Service de gestion administrateur
   * @param fb Constructeur de formulaire natif angular
   * @param router Gestion du routing (natif angular)
   */
  constructor(
    private adminService: AdministratorService,
    private fb: FormBuilder,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {
  }

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
    this.adminForm = this.fb.group({
      login: ['', [Validators.required, Validators.maxLength(250)]],
      password: ['', [Validators.required, Validators.maxLength(15)]],
    });
  }

  /**
   * Permet de retourner les controls du formulaire de création d'anomalie facilement
   */
  get f() {
    return this.adminForm.controls;
  }

  /**
   * Détection des erreurs sur les champs
   * @param formField Champs concerné pour la vérification
   * @returns La validité du champ concerné
   */
  errorDetection(formField: string): boolean {
    switch (formField) {
      case 'login': {
        if (
          this.f.login.invalid &&
          (this.f.login.dirty || this.f.login.touched || this.isSubmit)
        ) {
          if (this.f.login.errors.required) {
            this.messageErrorLogin = 'Le champ doit être rempli';
            return true;
          } else if (this.f.login.errors.maxlength) {
            this.messageErrorLogin =
              "Le champ doit être d'une longueur maximale de 250 caractères";
            return true;
          }
        }
        break;
      }
      case 'password': {
        if (
          this.f.password.invalid &&
          (this.f.password.dirty || this.f.password.touched || this.isSubmit)
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
    }
  }

  /**
   * Récupération du nombre de caractères écrits pour le mot de passe
   */
  get passwordChars(): number {
    return this.f.password.value?.length || 0;
  }

  /**
   * Récupération du nombre de caractères écrits pour le login
   */
  get loginChars(): number {
    return this.f.login.value?.length || 0;
  }

  /**
   * Méthode appelée lors de la soumission du formulaire.
   */
  onSubmit(): void {
    this.isSubmit = true;

    if (!this.f.login.invalid &&
      !this.f.password.invalid) {
      const loginAdmin = new Administrator({
        id: -1,
        username: this.f.login.value,
        password: this.f.password.value
      });

      this.adminService.loginAdmin(loginAdmin).subscribe(result => {
          this.tokenStorageService.saveToken(result.token);
          this.tokenStorageService.saveAdmin(result.admin);

          this.router.navigate(['/admin/accept-renter']);
        }
      );
    }
  }

}
