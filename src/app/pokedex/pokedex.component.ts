import { CommonModule } from '@angular/common';
import { PokeapiService } from './../pokeapi.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule, FormsModule], // Incluir FormsModule aquí
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  searchQuery: string = ''; // Añadir propiedad searchQuery

  constructor(private pokeapiService: PokeapiService) { }

  ngOnInit(): void {
    this.loadAllPokemons();
  }

  loadAllPokemons(): void {
    this.pokeapiService.getAllPokemons().subscribe({
      next: (data) => {
        this.pokemons = data;
        this.filteredPokemons = this.pokemons; // Inicializar filteredPokemons
      },
      error: (error) => {
        console.error('Error al cargar los Pokémon:', error);
      }
    });
  }

  getPokemonDetails(name: string): void {
    this.pokeapiService.getPokemonDetails(name).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error('Error al cargar los detalles del Pokémon:', error);
      }
    });
  }

  filterPokemons(): void {
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}

