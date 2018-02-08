import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(public http:Http) {

  }

  getBeer(id:number) {
    let url:string = 'https://api.punkapi.com/v2/beers/' + id;

    return this.http.get(url)
      .map(result => result.json());
  }

  getBeers(page?:number, perPage?:number) {
    let url:string = 'https://api.punkapi.com/v2/beers';

    if (!page) {
      page = 1;
    }
    if (!perPage || perPage > 50) {
      perPage = 5
    }
    url += '?page=' + page + '&per_page=' + perPage;

    return this.http.get(url)
      .map(result => result.json());
  }



}
