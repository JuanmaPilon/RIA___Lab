import { Sesion } from './../sesion';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { UserEventsService } from '../user-events';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-barra',
  standalone: true,
  imports: [RouterLink, LoginComponent, RegisterComponent, CommonModule],
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit, OnDestroy{
  currentUser: any = {};
  loadingUser: boolean = true;
  private userSubscription: Subscription = new Subscription();
  @ViewChild(LoginComponent) login!: LoginComponent;
  @ViewChild(RegisterComponent) register!: RegisterComponent;
  constructor(public Sesion: Sesion, private userEventsService: UserEventsService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
    // Suscribirse al evento de éxito de inicio de sesión después de inicialización
    this.subscribeToLoginSuccess();
  }

  ngAfterViewInit(): void {
    // Si login aún no está definido en ngOnInit, suscribirse después de la inicialización de la vista
    if (this.login) {
      this.subscribeToLoginSuccess();
    }
  }
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
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
  private subscribeToLoginSuccess(): void {
    if (this.login && this.login.loginSuccess) {
      // Suscribirse al evento de éxito de inicio de sesión
      this.userSubscription = this.userEventsService.userUpdated$.subscribe(user => {
        this.currentUser = user;
      });

      this.login.loginSuccess.subscribe(user => {
        this.currentUser = user;
      });
    }
  }
}
