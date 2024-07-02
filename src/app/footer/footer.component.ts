import { Component,OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sesion } from './../sesion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class FooterComponent {
  currentUser: any = {};
  constructor(public Sesion: Sesion){}
  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }
}
