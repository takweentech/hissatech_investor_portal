import { Component } from '@angular/core';
import { GreetingComponent } from "./components/greeting/greeting.component";

@Component({
  selector: 'app-dashboard',
  imports: [GreetingComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
