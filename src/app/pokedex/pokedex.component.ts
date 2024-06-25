import { ModalDComponent } from './../modal-d/modal-d.component';
import { CommonModule } from '@angular/common';
import { PokeapiService } from './../pokeapi.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importar FormsModule


@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalDComponent], // Incluir FormsModule aquí
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  searchQuery: string = ''; // Añadir propiedad searchQuery

  @ViewChild(ModalDComponent) ModalDComponent!: ModalDComponent;


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
        this.ModalDComponent.openModal(data);
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
  getPokemonCardClass(pokemon: any): string {
    // Devolver la clase CSS correspondiente al tipo de Pokémon
    switch (pokemon.type.toLowerCase()) {
      case 'grass':
        return 'card card-grass';
      case 'fire':
        return 'card card-fire';
      case 'water':
        return 'card card-water';
      default:
        return 'card';
    }
  }

}

