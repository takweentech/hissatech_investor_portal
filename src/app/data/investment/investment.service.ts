import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CustomHttpResponse, PagedResponse } from '../../core/models/httpResponse.model';
import { InvestementCreation, Investment, InvestmentFilterRequest } from './investment';



@Injectable({
    providedIn: 'root'
})
export class InvestmentService {
    private readonly http = inject(HttpClient);

    add(investment: InvestementCreation): Observable<CustomHttpResponse> {
        return this.http.post<CustomHttpResponse>(environment.apiUrl + '/Investments/Add', investment)
    }

    getPaged(filter: InvestmentFilterRequest): Observable<CustomHttpResponse<PagedResponse<Investment>>> {
        return this.http.post<CustomHttpResponse<PagedResponse<Investment>>>(environment.apiUrl + '/Investments/GetPaged', filter)
    }

    getById(id: number | string) {
        return this.http.get(environment.apiUrl + '/Investments/Get/' + id)
    }


    getAll() {
        return this.http.get(environment.apiUrl + '/Investments/GetAll')
    }




}
