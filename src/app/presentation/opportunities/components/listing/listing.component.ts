import { Component, inject, OnInit, signal } from '@angular/core';
import { OpportunityCardComponent } from "../../../../shared/components/opportunity-card/opportunity-card.component";
import { BaseComponent } from '../../../../core/base/base.component';
import { Property, PropertyRequestFilter } from '../../../../data/property/property';
import { PropertyService } from '../../../../data/property/property.service';
import { finalize, takeUntil } from 'rxjs';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-listing',
  imports: [OpportunityCardComponent, NgbPaginationModule, TranslatePipe],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent extends BaseComponent implements OnInit {

  private readonly propertyService = inject(PropertyService);
  properties = signal<Property[]>([]);
  total = signal<number>(0);
  loading = signal<boolean>(false);
  filter: PropertyRequestFilter = {
    pageNumber: 1, pageSize: 6, filter: { status: 2 },
    orderByValue: [
      {
        colId: 'Id',
        sort: 'desc'
      }
    ]
  }


  ngOnInit(): void {
    this.getProperties();
  }


  getProperties(): void {
    this.loading.set(true);
    this.propertyService.getPaged(this.filter).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loading.set(false)),
    ).subscribe({
      next: (response) => {
        this.properties.set(response.data?.data as Property[])
        this.total.set(response.data?.totalCount)
      },
      error: (err) => {

      }
    });
  }


  onPageChange(event: number) {
    this.filter.pageNumber = event;
    this.getProperties();
  }

  get startIndex(): number {
    const pageSize = this.filter?.pageSize || 0;
    const pageNumber = this.filter?.pageNumber || 0;
    return (pageSize * (pageNumber - 1)) + 1;
  }

  get endIndex(): number {
    const pageSize = this.filter?.pageSize || 0;
    const pageNumber = this.filter?.pageNumber || 0;
    return pageSize * pageNumber;
  }

}
