import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon'; // la api de la pokeapi
  private pokemonCount = 150; // Número total de Pokémon (puede cambiar con el tiempo)

  constructor(private http: HttpClient) { }


  getAllPokemons(): Observable<any[]> {
    const requests: Observable<any>[] = [];
    const limit = 150; // Número de Pokémon por solicitud
    for (let offset = 0; offset < this.pokemonCount; offset += limit) {
      requests.push(this.http.get<any>(`${this.baseUrl}?limit=${limit}&offset=${offset}`));
    }

    return forkJoin(requests).pipe(
      map((responses: any[]) => {
        return responses.reduce((acc, response) => acc.concat(response.results), []);
      }),
      switchMap((pokemons: any[]) => {
        const detailRequests: Observable<any>[] = pokemons.map((pokemon: any) =>
          this.getPokemonDetails(pokemon.name).pipe(
            map(details => ({
              ...pokemon,
              imageUrl: details.sprites.other.dream_world.front_default
            }))
          )
        );
        return forkJoin(detailRequests);
      })
    );
  }


  getPokemonDetails(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${name}`);
  }
}
