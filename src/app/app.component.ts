import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraComponent } from './barra/barra.component';
import { CommonModule } from '@angular/common';
import { PokedexComponent } from './pokedex/pokedex.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BarraComponent, CommonModule, PokedexComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {

}
