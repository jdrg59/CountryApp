import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  //guardar datos ingresados en el servicio y no en localstorage
  public cacheStore = {
    byCapital:      { term: '', countries:[]},
    byCountries:    { term: '', countries:[] },
    byRegion:       { region: '', countries:[]},

  }


  constructor(private httpClient: HttpClient) { }

  private getCountriesRequest( url: string ): Observable<Country[]>{
    return this.httpClient.get<Country[]>( url )
    .pipe(
      catchError( error => of([]) ),
      //espere que carge
      delay( 2000 ),
    )
  }



  searchCountryByAlphaCode(code: string):Observable<Country | null >{

    const url = `${ this.apiUrl }/alpha/${ code }`;

    return this.httpClient.get<Country[]>( url)
      .pipe(
        //una metodo que regresa un pais si lo encuentra, de un arreglo de paises
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( error => {
          console.log(error);
          return of(null)//retorna una arreglo vacio
        })
      );
  }

  //creamos nuevo metodo
  //que es lo que voy a retornar cuando alguien busque <Country[]> y mas de uno
  //para hacer la solicitud tiene que hacerce el subcribe
  searchCapital(term: string):Observable<Country[]>{
    const url = `${ this.apiUrl }/capital/${ term }`;
    return this.getCountriesRequest(url)
    //solo para guardar en local storage
      .pipe(
        tap( countries => this.cacheStore.byCapital = { term: term, countries: countries })
      );
  }
  searchCountry(term: string):Observable<Country[]>{
    const url = `${ this.apiUrl }/name/${ term }`;
    return this.getCountriesRequest(url);
  }
  searchRegion( region: string):Observable<Country[]>{
    const url = `${ this.apiUrl }/region/${ region }`;
    return this.getCountriesRequest(url);
  }
  // ### OLD VERSION
  //  searchRegion( region: string):Observable<Country[]>{
  //   const url = `${ this.apiUrl }/region/${ region }`;
  //   return this.httpClient.get<Country[]>( url)
  //     .pipe(
  //       catchError( error => {
  //         console.log(error);
  //         return of([])//retorna una arreglo vacio
  //       })
  //     );
  // }
}
