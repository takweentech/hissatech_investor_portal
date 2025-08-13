import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-back-button',
  imports: [TranslatePipe],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss'
})
export class BackButtonComponent {
  private readonly location = inject(Location);

  onBack(): void {
    this.location.back()
  }

}
