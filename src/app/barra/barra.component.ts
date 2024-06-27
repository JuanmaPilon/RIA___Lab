import { Sesion } from './../sesion';
import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barra',
  standalone: true,
  imports: [RouterLink, LoginComponent, RegisterComponent, CommonModule],
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent {
  @ViewChild(LoginComponent) login!: LoginComponent;
  @ViewChild(RegisterComponent) register!: RegisterComponent;
  constructor(public Sesion: Sesion) {}

  logout(): void {
    this.Sesion.logout();
    window.location.href = '/login';
  }

  openLoginModal(): void {
    this.login.openModal();
  }

  openRegisterModal(): void {
    this.register.openModal();
  }
}
