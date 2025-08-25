import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CustomHttpResponse } from '../../core/models/httpResponse.model';
import { UpdatePasswordDto, UpdatePhoneEmailDto } from './account';



@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl: string = 'Accounts';



    updatePhone(dto: UpdatePhoneEmailDto, token: string): Observable<CustomHttpResponse<{}>> {
        return this.http.post<CustomHttpResponse<{}>>(environment.apiUrl + `/${this.baseUrl}/UpdatePhone`, dto, { headers: { 'Authorization': 'Bearer ' + token } })
    }

    updateEmail(dto: UpdatePhoneEmailDto, token: string): Observable<CustomHttpResponse> {
        return this.http.post<CustomHttpResponse>(environment.apiUrl + `/${this.baseUrl}/UpdateEmail`, dto, { headers: { 'Authorization': 'Bearer ' + token } })
    }

    updatePassword(dto: UpdatePasswordDto): Observable<CustomHttpResponse> {
        return this.http.post<CustomHttpResponse>(environment.apiUrl + `/${this.baseUrl}/UpdatePassword`, dto)
    }

    sendOtpPhoneEmail(email: string, phone: string): Observable<CustomHttpResponse<{ last4dmobile: string, token: string }>> {
        return this.http.post<CustomHttpResponse<{ last4dmobile: string, token: string }>>(environment.apiUrl + `/${this.baseUrl}/SendOtpPhoneEmail`, {}, { params: { email, phone } })
    }







}
