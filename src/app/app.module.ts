import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { BeersComponent } from './components/beers/beers.component'
import { BeerComponent } from './components/beer/beer.component';
import { ActivatedRoute } from '@angular/router/src/router_state';

const appRoutes: Routes = [
  { path: 'beer/:id', component: BeerComponent },
  { path: 'beers', component: BeersComponent },
  { path: '**', component: BeersComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BeersComponent,
    BeerComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
