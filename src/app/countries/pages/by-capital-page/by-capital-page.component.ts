import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;

constructor( private countriesService: CountriesService){}

  searchByCapital(term: string ): void {
    this.isLoading = true;
    //mandamos a llamar el servicio
    //sino nos subscribimos nunca va renderizar el valor en Network podeis comprobar
    this.countriesService.searchCapital( term )
      .subscribe( countries => {
        //guardamos la consulta que le mandamos a nuestro servicio
        this.countries = countries;

        //ya muestra resultados
        this.isLoading = false;
      });


    // console.log('desde ByCapitalPage')
    console.log({term})
  }

}
