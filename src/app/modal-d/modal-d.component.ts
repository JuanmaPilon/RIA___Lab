import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-modalDComponent',
  templateUrl: './modal-d.component.html',
  styleUrls: ['./modal-d.component.css']
})
export class ModalDComponent {
  @Input() pokemon: any;
  isVisible: boolean = false;

  openModal(pokemon: any): void {
    this.pokemon = pokemon;
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
  }
}
