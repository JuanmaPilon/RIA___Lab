import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { TeamComponent } from './team/team.component';
import { BarraComponent } from './barra/barra.component';




export const routes: Routes = [
  { path: 'barra', component: BarraComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'pokedex', component: PokedexComponent},
  { path: 'team', component: TeamComponent},
  { path: '**', redirectTo:'inicio', pathMatch:'full'}
];
