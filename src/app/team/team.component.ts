import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Sesion } from '../sesion';
import { PokeapiService } from '../pokeapi.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  team: any[] = [];
  currentUser: any;

  constructor(private http: HttpClient, private pokeapiService: PokeapiService, private sesion: Sesion) {}

  ngOnInit(): void {
    this.pokeapiService.getAllPokemons().subscribe(pokemons => {
      this.pokemons = pokemons;
      this.filteredPokemons = pokemons.slice(0, 3);
    });

    this.currentUser = this.sesion.getCurrentUser();
    if (this.currentUser) {
      this.loadTeamFromServer(this.currentUser.username);
    }
  }

  filterPokemons(): void {
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    ).slice(0, 3);
  }

  selectPokemon(pokemon: any, fromTeam: boolean = false): void {
    this.selectedPokemon = pokemon;

    Swal.fire({
      title: pokemon.name,
      text: '¿Qué quieres hacer con este Pokémon?',
      imageUrl: pokemon.imageUrl,
      imageWidth: 200,
      imageHeight: 200,
      showCancelButton: true,
      showDenyButton: fromTeam,
      confirmButtonText: fromTeam ? 'Quitar del equipo' : 'Agregar',
      denyButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (fromTeam) {
          this.removePokemon(pokemon);
        } else {
          this.addPokemon(pokemon);
        }
      }
    });
  }

  addPokemon(pokemon: any): void {
    if (this.team.length < 5) {
      this.team.push(pokemon);
      console.log('Equipo actualizado:', this.team);
      this.saveTeamToServer();
      Swal.fire('¡Agregado!', `${pokemon.name} ha sido agregado a tu equipo.`, 'success');
    } else {
      Swal.fire('¡Equipo completo!', 'Ya tienes 5 Pokémon en tu equipo.', 'warning');
    }
  }

  removePokemon(pokemon: any): void {
    const index = this.team.indexOf(pokemon);
    if (index !== -1) {
      this.team.splice(index, 1);
      this.saveTeamToServer();
      Swal.fire('¡Quitado!', `${pokemon.name} ha sido quitado de tu equipo.`, 'success');
    } else {
      Swal.fire('No encontrado', `${pokemon.name} no está en tu equipo.`, 'error');
    }
  }

  saveTeamToServer(): void {
    const userId = this.currentUser.id;
    if (!userId) {
      console.error('No se ha encontrado el ID del usuario actual.');
      return;
    }
    if (!this.team || this.team.length === 0) {
      console.error('El equipo está vacío o no es válido.');
      return;
    }

    this.http.get<any>(`http://localhost:3000/usuario/${userId}`)
      .subscribe(
        userData => {
          if (!userData) {
            console.error('Usuario no encontrado.');
            return;
          }

          const updatedUser = {
            ...userData,
            equipo: this.team
          };

          this.http.put<any>(`http://localhost:3000/usuario/${userId}`, updatedUser)
            .pipe(
              catchError(error => {
                console.error('Error en la solicitud HTTP:', error);
                return throwError(error);
              })
            )
            .subscribe(
              () => {
                console.log('Equipo guardado en el servidor JSON.');
              },
              error => {
                console.error('Error al guardar el equipo en el servidor:', error);
              }
            );
        },
        error => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
  }

  loadTeamFromServer(username: string): void {
    this.http.get<any>(`http://localhost:3000/usuario?username=${username}`)
      .subscribe(
        data => {
          if (data && data.length > 0) {
            const user = data[0];
            if (user.equipo) {
              this.team = user.equipo;
              console.log('Equipo cargado desde el servidor JSON:', this.team);
            } else {
              this.team = [];
              console.warn('El servidor no devolvió un equipo válido.');
            }
          } else {
            console.warn('Usuario no encontrado o no válido.');
          }
        },
        error => {
          console.error('Error en la solicitud HTTP:', error);
        }
      );
  }
}
