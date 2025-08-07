import { Component, inject } from '@angular/core';
import { Property } from '../../../../data/property/property';
import { ActivatedRoute } from '@angular/router';
import { NgStyle } from '@angular/common';
import { LightgalleryModule } from 'lightgallery/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationComponent } from '../application/application.component';
import { InvestData } from '../../../../data/investment/investment';

@Component({
  selector: 'app-details',
  imports: [LightgalleryModule, NgStyle],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  private modalService = inject(NgbModal);

  private readonly activatedRoute = inject(ActivatedRoute);
  property: Property = this.activatedRoute.snapshot.data['property']?.data;
  investment: InvestData = this.activatedRoute.snapshot.data['investment']?.data;


  settings = {
    counter: false,
    download: false,
    selector: 'a',
    loop: false,
  };


  onInvest() {
    const modalRef = this.modalService.open(ApplicationComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.property = this.property;
  }
}
