import { Region } from "./country-types";
import { Country } from "./country.interface";

export interface CacheStore{
  byCapital:TermCountries,
  byCountry:TermCountries,
  byRegion: RegionCountry
}

export interface TermCountries{
  term: string;
  countries: Country[]
}

export interface RegionCountry{
  region: Region,
  countries: Country[]
}
