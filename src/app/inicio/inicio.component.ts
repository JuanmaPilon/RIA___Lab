import { Component, OnInit } from '@angular/core';
import { PokeapiService } from './../pokeapi.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  pokemonImages: string[] = [];
  customOptions: any = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  };

  constructor(private pokeapiService: PokeapiService) { }

  ngOnInit(): void {
    this.loadRandomPokemonImages();
  }

  loadRandomPokemonImages(): void {
    this.pokeapiService.getAllPokemons().subscribe({
      next: (pokemons) => {
        const randomPokemons = this.getRandomItems(pokemons, 5);
        this.pokemonImages = randomPokemons.map(pokemon => pokemon.imageUrl);
      },
      error: (error) => {
        console.error('Error al cargar los Pokémon:', error);
      }
    });
  }

  getRandomItems(arr: any[], count: number): any[] {
    const shuffled = arr.slice(0);
    let i = arr.length;
    let temp, index;
    while (i--) {
      index = Math.floor(Math.random() * (i + 1));
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(0, count);
  }
}
