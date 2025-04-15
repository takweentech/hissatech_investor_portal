import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
    providedIn: 'root'
})
export class InvestorService {
    private readonly http = inject(HttpClient);

    getPaged() {
        return this.http.post(environment.apiUrl + '/Investors/GetPaged', {})
    }

    getById(id: number | string) {
        return this.http.get(environment.apiUrl + '/Investors/Get/' + id)
    }

    updateBanInfo() {
        return this.http.post(environment.apiUrl + '/Investors/UpdateBankInformation', {})
    }



}
