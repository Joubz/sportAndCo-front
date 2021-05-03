import {Component, OnInit, OnDestroy} from '@angular/core';

/**
 * Composant principal
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  /**
   * Constructeur du composant
   */
  constructor() { }

  /**
   * Initialisation du composant
   */
  ngOnInit(): void {
    const json = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Sport & Co",
      "legalName": "Sport & Co",
      "url": window.location.protocol + window.location.host,
      "logo": window.location.protocol + window.location.host + "/assets/images/logo.png",
      "foundingDate": "2021"
    });
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = json;
    script.async = true;
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  /**
   * Destruction du composant
   */
  ngOnDestroy(): void {
  }
}
