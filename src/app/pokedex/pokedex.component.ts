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
    this.PokeapiService.getPokemons(this.limit, this.offset).subscribe(data => {
      this.pokemons = data.results;
    });
  }
  getPokemonDetails(name: string): void {
    this.PokeapiService.getPokemonDetails(name).subscribe(data => {
      console.log(data);
    });
  }
}
