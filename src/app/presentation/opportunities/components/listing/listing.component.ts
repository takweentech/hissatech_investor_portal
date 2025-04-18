import { Component, inject, OnInit, signal } from '@angular/core';
import { OpportunityCardComponent } from "../../../../shared/components/opportunity-card/opportunity-card.component";
import { BaseComponent } from '../../../../core/base/base.component';
import { Property } from '../../../../data/property/property';
import { PropertyService } from '../../../../data/property/property.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-listing',
  imports: [OpportunityCardComponent],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent extends BaseComponent implements OnInit {

  private readonly propertyService = inject(PropertyService);
  properties = signal<Property[]>([]);
  total = signal<number>(0);


  ngOnInit(): void {
    this.getProperties();
  }


  getProperties(): void {
    this.propertyService.getPaged({ pageNumber: 1, pageSize: 5, filter: {} }).pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: (response) => {
        this.properties.set(response.data?.data as Property[])
        this.total.set(response.data?.totalCount)
      },
      error: (err) => {

      }
    });
  }
}
