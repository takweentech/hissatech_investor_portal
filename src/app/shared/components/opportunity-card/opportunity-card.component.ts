import { Component, Input } from '@angular/core';
import { Property } from '../../../data/property/property';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe, DatePipe, NgStyle } from '@angular/common';

@Component({
  selector: 'app-opportunity-card',
  imports: [NgbCarouselModule, DatePipe, NgStyle],
  templateUrl: './opportunity-card.component.html',
  styleUrl: './opportunity-card.component.scss'
})
export class OpportunityCardComponent {
  @Input() variation: 'v-1' | 'v-2' = 'v-1';
  @Input() property!: Property;
}
