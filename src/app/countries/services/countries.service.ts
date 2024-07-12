import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, delay, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/country-types';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private url:string = 'https://restcountries.com/v3.1';
  public cacheStore:CacheStore = {
    byCapital: {term: '',countries: []},
    byCountry: {term: '',countries: []},
    byRegion:  {region: '',countries: []}
  };

  constructor(
    public http:HttpClient
  ){
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStore))
  }

  private loadFromLocalStorage(){
    if (!localStorage.getItem('cacheStorage')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStorage')!);
  }

  private getCountriesRequest(url:string):Observable<Country[]>{
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(() => of([])),
      //delay(2000)
    );
  }

  searchCapital(term:string):Observable<Country[]>{
    const url = `${this.url}/capital/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byCapital = {term, countries}),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchCountry(term:string):Observable<Country[]>{
    const url = `${this.url}/name/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCountry = {term,countries}),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchRegion(term:Region):Observable<Country[]>{
    const url = `${this.url}/region/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byRegion = {region:term,countries}),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchCountryByAlphaCode(alphaCode:string):Observable<Country | null>{
    const url = `${this.url}/alpha/${alphaCode}`;

    return this.http.get<Country[]>(url)
    .pipe(
      map((countries) => countries.length > 0 ? countries[0]: null),
      catchError(() => of(null))
    )
  }
}
