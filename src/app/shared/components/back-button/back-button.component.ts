import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  imports: [],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss'
})
export class BackButtonComponent {
  private readonly location = inject(Location);

  onBack(): void {
    this.location.back()
  }

}
