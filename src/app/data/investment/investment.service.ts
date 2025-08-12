import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CustomHttpResponse, PagedResponse } from '../../core/models/httpResponse.model';
import { InvestData, InvestementCreation, Investment, InvestmentCheck, InvestmentFilterRequest } from './investment';



@Injectable({
    providedIn: 'root'
})
export class InvestmentService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl: string = 'Investments';



    add(investment: InvestementCreation): Observable<CustomHttpResponse> {
        return this.http.post<CustomHttpResponse>(environment.apiUrl + `/${this.baseUrl}/Add`, investment)
    }

    getPaged(filter: InvestmentFilterRequest): Observable<CustomHttpResponse<PagedResponse<Investment>>> {
        return this.http.post<CustomHttpResponse<PagedResponse<Investment>>>(environment.apiUrl + `/${this.baseUrl}/GetPaged`, filter)
    }

    getById(id: number | string): Observable<CustomHttpResponse<Investment>> {
        return this.http.get<CustomHttpResponse<Investment>>(environment.apiUrl + `/${this.baseUrl}/Get/` + id)
    }

    getAll() {
        return this.http.get(environment.apiUrl + `/${this.baseUrl}/GetAll`)
    }

    getInvestData(propertyId: string): Observable<CustomHttpResponse<InvestData>> {
        return this.http.get<CustomHttpResponse<InvestData>>(environment.apiUrlV2 + `/${this.baseUrl}/GetInvestData`, { params: { PropertyId: propertyId } })
    }

    checkInvestment(propertyId: number, amount: number, promoCode: string | null): Observable<CustomHttpResponse<InvestmentCheck>> {
        const params: any = { propertyId, amount, promoCode: promoCode as string };
        if (!params.promoCode) {
            delete params.promoCode
        };
        return this.http.get<CustomHttpResponse<InvestmentCheck>>(environment.apiUrlV2 + `/${this.baseUrl}/ChickInvestment`, { params: params })
    }

    confirmInvestment(investmentId: number, investorId: number): Observable<CustomHttpResponse<{}>> {
        return this.http.post<CustomHttpResponse<{}>>(environment.apiUrlV2 + `/${this.baseUrl}/ConfirmInvestment`, {}, { params: { investmentId, investorId } })
    }

    downloadAgreement(id: number): Observable<Blob> {
        return this.http.get(
            environment.apiUrl + `/${this.baseUrl}/GetCertificate/${id}`,
            { responseType: 'blob' }
        );
    }




}
