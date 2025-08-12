import { Component } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";

@Component({
  selector: 'app-admin',
  imports: [HeaderComponent, FooterComponent, RouterOutlet, SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
