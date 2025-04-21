import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PropertyService } from '../../data/property/property.service';
import { Property } from '../../data/property/property';

export const propertyResolver: ResolveFn<any> = (route, state) => {
  const propertyService = inject(PropertyService);
  return propertyService.getById(route.params['id']);
};
