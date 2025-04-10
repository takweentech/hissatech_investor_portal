import { Component } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
