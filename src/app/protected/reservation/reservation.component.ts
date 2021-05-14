import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    console.log(this.router.getCurrentNavigation().extras.state['data']);
  }

  dto: number;

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
      // console.log("Method Implementation");
    console.log( window.history.state["data"]);
    console.log(history.state["data"]);
  }


}
