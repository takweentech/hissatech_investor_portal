import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PropertyService } from '../../data/property/property.service';
import { Property } from '../../data/property/property';
import { CustomHttpResponse } from '../../core/models/httpResponse.model';
import { InvestData } from '../../data/investment/investment';
import { InvestmentService } from '../../data/investment/investment.service';

export const propertyResolver: ResolveFn<CustomHttpResponse<Property>> = (route, state) => {
  const propertyService = inject(PropertyService);
  return propertyService.getById(route.params['id']);
};

export const investmentResolver: ResolveFn<CustomHttpResponse<InvestData>> = (route, state) => {
  const investmentService = inject(InvestmentService);
  return investmentService.getInvestData(route.params['id']);
};

