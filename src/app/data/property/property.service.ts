import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CustomHttpResponse, PagedResponse } from '../../core/models/httpResponse.model';
import { Property, PropertyRequestFilter } from './property';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private readonly http = inject(HttpClient);

  getPaged(filter: PropertyRequestFilter): Observable<CustomHttpResponse<PagedResponse<Property>>> {
    return this.http.post<CustomHttpResponse<PagedResponse<Property>>>(environment.apiUrl + '/Property/GetPaged', filter)
  }

  getById(id: number | string): Observable<CustomHttpResponse<Property>> {
    return this.http.get<CustomHttpResponse<Property>>(environment.apiUrl + '/Property/Get/' + id)
  }

  getAll() {
    return this.http.get(environment.apiUrl + '/Property/GetAll')
  }


}
