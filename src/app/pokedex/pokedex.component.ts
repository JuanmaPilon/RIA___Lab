import { CommonModule } from '@angular/common';
import { PokeapiService } from './../pokeapi.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})
export class PokedexComponent implements OnInit {
  pokemons: any[] = [];
  limit = 20;
  offset = 0;

  constructor(private PokeapiService: PokeapiService) { }

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.PokeapiService.getPokemons(this.limit, this.offset).subscribe({
      next: (data) => {
        this.pokemons = data.results;
        this.pokemons.forEach(pokemon => {
          this.PokeapiService.getPokemonDetails(pokemon.name).subscribe(details => {
            pokemon.imageUrl = details.sprites.front_default;
          });
        });
      },
      error: (error) => {
        console.error('Error al cargar los Pokémon:', error);
      }
    });
  }

  getPokemonDetails(name: string): void {
    this.PokeapiService.getPokemonDetails(name).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error('Error al cargar los detalles del Pokémon:', error);
      }
    });
  }
}
