import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

//es una como interfas pero fijas
// type Region = 'Africa'|'Americas'|'Asia'|'Europe'|'Oceania';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [

  ]
})
export class ByRegionPageComponent {
 public countries: Country[] = [];
 public regions: Region[] = [ 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

 public selectedRegion?: Region;

constructor( private regionService: CountriesService){}

searchByRegion(region: Region ): void {

  this.selectedRegion = region
  //mandamos a llamar el servicio
  //sino nos subscribimos nunca va renderizar el valor en Network podeis comprobar
  this.regionService.searchRegion( region )
    .subscribe( countries => {
      //guardamos la consulta que le mandamos a nuestro servicio
      this.countries = countries;

    });

  // console.log('desde ByCapitalPage')
  console.log({region})
}

}

