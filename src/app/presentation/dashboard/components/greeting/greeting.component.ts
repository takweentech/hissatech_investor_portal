import { Component } from '@angular/core';
import { InitialsComponent } from "../../../../shared/components/initials/initials.component";

@Component({
  selector: 'app-greeting',
  imports: [InitialsComponent],
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.scss'
})
export class GreetingComponent {

}
