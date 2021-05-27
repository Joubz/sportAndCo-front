import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginRenterService } from 'src/app/core/services/login-renter.service';
import { Renter } from 'src/app/shared/models/renter.model';

/**
 * Composant de gestion de la page de connexion loueur 
 */
@Component({
  selector: 'app-login-renter',
  templateUrl: './login-renter.component.html',
  styleUrls: ['./login-renter.component.css']
})
export class LoginRenterComponent implements OnInit, OnDestroy {

  /**
   * Objet Renter (Loueur)
   */
  renter: Renter;

  /**
   * Formulaire de connexion loueur
   */
  loginRenterForm: FormGroup;

  /**
   * Boolean pour soumission du formulaire
   */
  submitted: boolean;

  /**
   * 
   * @param fb 
   * @param router 
   * @param loginRenterService 
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginRenterService: LoginRenterService
  ) { }

  /**
   * Intialisation du composant
   */
  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Destruction du composant
   */
  ngOnDestroy(): void {
  }

  initForm(): void {
    this.loginRenterForm = this.fb.group({
      username: [],
      password: []
    });
  }

  /**
   * Permet de retourner les controls du formulaire de connexion facilement
   */
   get f() {
    return this.loginRenterForm.controls;
  }

  /**
   * Détection des erreurs sur les champs
   * @param formField Champs concerné pour la vérification
   * @returns La validité du champ concerné
   */
   errorDetection(formField: string): boolean {
    switch (formField) {
      case 'username':
        return this.f.username.invalid && (this.f.username.dirty || this.f.username.touched || this.submitted);
      case 'password':
        return this.f.password.invalid && (this.f.password.dirty || this.f.password.touched || this.submitted);
    }
  }

  /**
   * méthode appelée lors de la soumission du formulaire.
   * Elle appelle l'API de connexion aux pages administrateurs
   */
   onSubmit(): void {
     this.submitted = true;

     if(
       !this.f.username.invalid &&
       !this.f.password.invalid
     ) {
      const newRenter = new Renter({
        id: -1,
        password: this.f.password.value,
        metropolises: null,
        isAccepted: 1,
        companyName: null,
        lastName: null,
        firstName: null,
        email: this.f.username.value,
        phone: null,
        birthDate: null,
        address: null,
        additionalAddress: null,
        postalCode: null,
        city: null,
        imageLink: null
      });

      this.loginRenterService.authLoginRenter(newRenter).subscribe(
        result => {
          console.log("ok login renter", result);

          this.router.navigate(['/home']);
        }
      )
    }
   }

}
