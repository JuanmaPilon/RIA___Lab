import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraComponent } from './barra/barra.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BarraComponent, PokedexComponent, FooterComponent, InicioComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {

}
