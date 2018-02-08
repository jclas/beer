import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { DataService } from '../../services/data.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})

export class BeersComponent implements OnInit {
  totalCount:number = 234; //unfortunately this API doesn't offer a "Total Count" value in any of its calls, so we hard-code it here.
  page:number=1
  perPage:number=25;
  beers: any[] = [];
  
  constructor(private router:Router, private activatedRoute:ActivatedRoute, private dataService:DataService) {

  }

  ngOnInit() {
   
    this.getBeers();

  }

  getBeers() {
    var that = this;
    this.dataService.getBeers(this.page, this.perPage).subscribe((beers:any[]) => {
      this.beers = this.beers.concat(beers);

      if (this.page * this.perPage < this.totalCount ) {
        $(document).scroll(function(e) {
          that.infinityScroll();
        });
      }
    });
  }

  selectBeer(id:any) {
    this.router.navigate(['/beer/'+id]);
  }

  infinityScroll() {
    //return if we've not scrolled to the last box yet
    if (!this.isScrollBottom("#beer-list div.beer-box:last")) {
      return;
    }

    //We're at the end of the page. Get more!

	  $(document).unbind('scroll');

	  if (this.page * this.perPage < this.totalCount) {
      this.page++;
      console.log('infinityScroll page:' + this.page);
      this.getBeers();
    }
  }

  isScrollBottom(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var $elem = $(elem);
    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    let result:boolean = (elemBottom <= docViewBottom) && (elemTop >= docViewTop);

    return result;
  }

}
