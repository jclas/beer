import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.css']
})
export class BeerComponent implements OnInit {
  beer:any;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { 

  }

  ngOnInit() {

    //Get a single beer using id 
    this.beer = this.activatedRoute.paramMap
      .switchMap((params: ParamMap) =>
        this.dataService.getBeer(parseInt(params.get('id')))).subscribe((beer) => {
            this.beer = beer[0];
        });
  }
}
