import { Component, inject } from '@angular/core';
import { Property } from '../../../../data/property/property';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { LightgalleryModule } from 'lightgallery/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvestData } from '../../../../data/investment/investment';
import { PropertyService } from '../../../../data/property/property.service';
import { InvestmentService } from '../../../../data/investment/investment.service';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';
import { environment } from '../../../../../environments/environment';
import { BackButtonComponent } from "../../../../shared/components/back-button/back-button.component";

@Component({
  selector: 'app-details',
  imports: [LightgalleryModule, NgStyle, RouterLink, BackButtonComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  private modalService = inject(NgbModal);
  private readonly propertyService = inject(PropertyService);
  private readonly investmentService = inject(InvestmentService);

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  property: Property = this.activatedRoute.snapshot.data['property']?.data;
  investment: InvestData = this.activatedRoute.snapshot.data['investment']?.data;

  WEB_ROUTES = WEB_ROUTES;
  settings = {
    counter: false,
    download: false,
    selector: 'a',
    loop: false,
  };

  ASSETS_URL = environment.assetsUrl;


  onInvest() {
    // const modalRef = this.modalService.open(ApplicationComponent, { centered: true, size: 'lg' });
    // modalRef.componentInstance.property = this.property;
    // modalRef.result.then(result => {
    //   if (result) {
    //     this.router.navigateByUrl('/' + WEB_ROUTES.INVESTMENTS.ROOT + '/' + WEB_ROUTES.INVESTMENTS.DETAILS + '/' + result)
    //   }
    // })
  }
}
