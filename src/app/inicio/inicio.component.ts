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
  pokemons: any[] = [];
  randomPokemons: any[] = [];

  constructor(private pokeapiService: PokeapiService) {}

  ngOnInit() {
    this.pokeapiService.getAllPokemons().subscribe(data => {
      this.pokemons = data;
      this.randomPokemons = this.getRandomPokemons(5);
    });
  }

  getRandomPokemons(count: number): any[] {
    const shuffled = [...this.pokemons].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

}
