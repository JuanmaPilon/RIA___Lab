import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokeapiService } from './../pokeapi.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  searchQuery: string = '';
  selectedPokemon: any = null;

  constructor(private pokeapiService: PokeapiService) {}

  ngOnInit(): void {
    this.pokeapiService.getAllPokemons().subscribe(pokemons => {
      this.pokemons = pokemons;
      this.filteredPokemons = pokemons.slice(0, 3); // Mostrar un máximo de 3 Pokémon inicialmente
    });
  }

  filterPokemons(): void {
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    ).slice(0, 3); // Mostrar un máximo de 3 Pokémon
  }

  selectPokemon(pokemon: any): void {
    this.selectedPokemon = pokemon;
  }
}
