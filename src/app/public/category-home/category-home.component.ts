import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from 'src/app/shared/models/search.model';

@Component({
  selector: 'app-category-home',
  templateUrl: './category-home.component.html',
  styleUrls: ['./category-home.component.css']
})
export class CategoryHomeComponent implements OnInit {
  @Output() searchEmitter: EventEmitter<Search> = new EventEmitter<Search>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(){
    this.router.navigate(['/home']);
  }

  // /**
  //  * Emission de l'objet de recherche pour le composant parent (trigger la fonction updateList du composant parent)
  //  */
  //  private _emitSearchObject() {
  //   const searchObject: Search = {
  //     productName: undefined,
  //     startDate: undefined,
  //     endDate: undefined,
  //     category: undefined,
  //     metropolises: undefined,
  //   };


  //   this.searchEmitter.emit(searchObject);
  // }

}
