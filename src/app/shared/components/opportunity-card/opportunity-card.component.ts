import { Component, Input } from '@angular/core';
import { Property } from '../../../data/property/property';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe, DatePipe, NgStyle } from '@angular/common';
import { WEB_ROUTES } from '../../../core/constants/routes.constants';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-opportunity-card',
  imports: [NgbCarouselModule, DatePipe, NgStyle, RouterLink, TranslatePipe],
  templateUrl: './opportunity-card.component.html',
  styleUrl: './opportunity-card.component.scss'
})
export class OpportunityCardComponent {
  @Input() variation: 'v-1' | 'v-2' = 'v-1';
  @Input() property!: Property;
  WEB_ROUTES = WEB_ROUTES;
}
