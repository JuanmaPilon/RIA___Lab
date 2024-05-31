import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private baseUrl: string = 'https://pokeapi.co/api/v2/'; //la api de la pokeapi

  // importo el http client para poder manejar llamadas a la api

  constructor(private http: HttpClient) { }

  getPokemon(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}pokemon/${name}`);
  }
}
