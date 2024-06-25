import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-barra',
  standalone: true,
  imports: [RouterLink, LoginComponent, RegisterComponent],
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent {
  @ViewChild(LoginComponent) login!: LoginComponent;
  @ViewChild(RegisterComponent) register!: RegisterComponent;

  openLoginModal(): void {
    this.login.openModal();
  }

  openRegisterModal(): void {
    this.register.openModal();
  }
}
