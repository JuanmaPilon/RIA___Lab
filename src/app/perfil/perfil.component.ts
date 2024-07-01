import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  currentUser: any;
  imageSelectorVisible: boolean = false;
  availableImages: string[] = ['perfil1.jpg', 'perfil2.jpg', 'perfil3.jpg', 'perfil4.jpg', 'perfil5.jpg', 'perfil6.jpg'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  selectImage(image: string): void {
    if (this.currentUser) {
      // Actualizar solo la propiedad `pfp` del usuario
      this.currentUser.pfp = image;

      // Guardar el usuario actualizado en localStorage
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

      // Enviar el usuario actualizado al backend para persistir los cambios
      this.http.put(`http://localhost:3000/usuario/${this.currentUser.id}`, this.currentUser)
        .subscribe(response => {
          console.log('User profile picture updated successfully', response);
        }, error => {
          console.error('Error updating profile picture', error);
        });
    }
    this.imageSelectorVisible = false;
  }

  toggleImageSelector(): void {
    this.imageSelectorVisible = !this.imageSelectorVisible;
  }
}

