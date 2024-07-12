import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent implements OnInit{
  public country:Country[] = [];
  public initialValue:string = '';

  constructor(
    public countriesService:CountriesService
  ){}

  ngOnInit(): void {
    this.country = this.countriesService.cacheStore.byCountry.countries;
    this.initialValue = this.countriesService.cacheStore.byCountry.term;
  }

  searchByCountry(term:string):void{
    this.countriesService.searchCountry(term).subscribe((countries) => {
      this.country = countries;
    })
  }
}
