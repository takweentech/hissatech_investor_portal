import { Component } from '@angular/core';
import { OpportunityCardComponent } from "../../../../shared/components/opportunity-card/opportunity-card.component";

@Component({
  selector: 'app-listing',
  imports: [OpportunityCardComponent],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent {

}
