import { ResolveFn } from '@angular/router';

export const propertyResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
