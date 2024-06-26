import { CommonModule } from '@angular/common';
import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RegisterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() loginSuccess: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(RegisterComponent) register!: RegisterComponent;
  loginForm: FormGroup;
  isVisible: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  openModal(): void {
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      const hashedPassword = CryptoJS.MD5(password).toString(CryptoJS.enc.Hex);

      this.http.get<any[]>('http://localhost:3000/usuario?username=' + username).subscribe(users => {


        if (users.length === 1) {
          const user = users[0];
          console.log('Retrieved User:', user);
          if (user.password === hashedPassword) {
            console.log('Login successful', user);
            Swal.fire({
               title:'Login successful',
               text:'Bienvenido!',
               icon:'success',
              customClass: {
                popup: 'sweetalert-borderless',
                confirmButton: 'sweetalert-borderless-button'
              }
          });
          // Emitir evento de éxito de inicio de sesión con el usuario
            this.loginSuccess.emit(user);
            // Simulación de sesión: guardar usuario en localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Redireccionar al usuario a la página deseada después de iniciar sesión
            this.router.navigate(['/perfil']);
           this.closeModal();
          } else {
            Swal.fire({
              title: 'Login failed',
              text: 'usuario o contraseña invalidos',
              icon: 'error',
              customClass: {
                confirmButton: 'sweetalert-borderless-button'
              },
            });
            console.error('Invalid username or password');
          }
        } else {
          Swal.fire({
            title: 'Login failed',
            text: 'usuario o contraseña invalidos',
            icon: 'error',
            customClass: {
              confirmButton: 'sweetalert-borderless-button'
            },
          });
          console.error('Invalid username or password');
        }
      }, error => {
        Swal.fire({
          title: 'Error',
          text: 'Falla inesperada, prueba más tarde',
          icon: 'error',
          customClass: {
            confirmButton: 'sweetalert-borderless-button'
          },
        });
        console.error('Error logging in', error);
      });
    }
  }

  openRegisterModal(): void {
    this.register.openModal();
  }

}
