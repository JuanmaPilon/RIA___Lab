import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isVisible: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      pfp: ['perfil1.jpg'],
      password: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      fdn: ['', [Validators.required]],
      favPok: ['', [Validators.required]]
    });
  }

  openModal(): void {
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
  }

  matchPassword(control: any): { [s: string]: boolean } | null {
    if (this.registerForm && (control.value !== this.registerForm.controls['password'].value)) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      user.password = CryptoJS.MD5(user.password).toString(CryptoJS.enc.Hex);

      this.http.post('http://localhost:3000/usuario', user).subscribe(response => {
        console.log('User registered successfully', response);
        this.closeModal();
      }, error => {
        console.error('Error registering user', error);
      });
    }
  }
}
