import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-barra',
  standalone: true,
  imports: [RouterLink, LoginComponent],
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent {
  @ViewChild(LoginComponent) login!: LoginComponent;

  openLoginModal(): void {
    this.login.openModal();
  }
}
