import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  currentUser: any;

  ngOnInit(): void {
    // Recuperar el usuario desde localStorage y parsear el JSON
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      this.currentUser = JSON.parse(userString);
    }
  }
}
