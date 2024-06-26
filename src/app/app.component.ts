import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraComponent } from './barra/barra.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BarraComponent, PokedexComponent, FooterComponent, InicioComponent, LoginComponent, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {

}
