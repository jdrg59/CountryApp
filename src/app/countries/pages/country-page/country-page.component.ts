import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: [

  ]
})
export class CountryPageComponent implements OnInit {
  //tomar captura de la ruta pero desde observable y no desde la web;

  public country?: Country;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    ){}

  //si aun no se ha iniciado la aplicaion
  // #####  manera #1 sin optimizar   #####
  // ngOnInit(): void {
  //   //activamos el servicio
  //   this.activatedRoute.params
  //     // .subscribe( (params) => {
  //     .subscribe( ({ id }) => {//destructurarndo

  //       this.countriesService.searchCountryByAlphaCode( id )
  //         .subscribe( country => {
  //           console.log({ country})
  //         })


  //       // console.log({ params: id })//<-- como definimos en countries-routing
  //     });
  // }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode ( id )),
      )
      .subscribe( country => {

        if( !country ) {
          return this.router.navigateByUrl('');
        }
        return this.country = country;
        // return
      })
  }

}
