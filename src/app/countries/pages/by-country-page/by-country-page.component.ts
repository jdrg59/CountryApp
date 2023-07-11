import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [

  ]
})
export class ByCountryPageComponent {

  public countries: Country[] = [];

  constructor(private countriesService: CountriesService){

  }

  searchByCountry(term: string ): void {
    //mandamos a llamar el servicio
    //sino nos subscribimos nunca va renderizar el valor en Network podeis comprobar
    this.countriesService.searchCountry( term )
      .subscribe( countries => {
        //guardamos la consulta que le mandamos a nuestro servicio
        this.countries = countries;

      });


    // console.log('desde ByCapitalPage')
    console.log({term})
  }

}
