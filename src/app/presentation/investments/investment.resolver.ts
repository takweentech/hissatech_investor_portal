import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { CustomHttpResponse } from '../../core/models/httpResponse.model';
import { InvestmentService } from '../../data/investment/investment.service';
import { Investment } from '../../data/investment/investment';

@Injectable({
    providedIn: 'root'
})
export class InvestmentResolver implements Resolve<CustomHttpResponse<Investment>> {
    private readonly investmentService = inject(InvestmentService);

    resolve(route: ActivatedRouteSnapshot): Observable<CustomHttpResponse<Investment>> {
        return this.investmentService.getById(route.paramMap.get('id') as string);
    }
}
