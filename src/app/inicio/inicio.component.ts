import { Component, OnInit, ViewChild } from '@angular/core';
import { PokeapiService } from './../pokeapi.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { ModalDComponent } from '../modal-d/modal-d.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CarouselModule, CommonModule,ModalDComponent],
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
  @ViewChild(ModalDComponent) ModalDComponent!: ModalDComponent;
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
}
