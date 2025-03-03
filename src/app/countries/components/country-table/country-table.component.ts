import { Country } from './../../interfaces/country.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.css'
})
export class CountryTableComponent {
  @Input()
  public countries: Country[] = []
}
