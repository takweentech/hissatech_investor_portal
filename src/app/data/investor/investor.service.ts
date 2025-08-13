import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CustomHttpResponse } from '../../core/models/httpResponse.model';
import { Portfolio } from './investor';



@Injectable({
    providedIn: 'root'
})
export class InvestorService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl: string = 'Investors';

    getPaged() {
        return this.http.post(environment.apiUrl + '/Investors/GetPaged', {})
    }

    getById(id: number | string) {
        return this.http.get(environment.apiUrl + '/Investors/Get/' + id)
    }

    updateBanInfo() {
        return this.http.post(environment.apiUrl + '/Investors/UpdateBankInformation', {})
    }


    getPortfolio(): Observable<CustomHttpResponse<Portfolio>> {
        return this.http.get<CustomHttpResponse<Portfolio>>(environment.apiUrl + `/${this.baseUrl}/GetPortfolio`)
    }



}
