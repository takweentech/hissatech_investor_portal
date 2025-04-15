import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
    providedIn: 'root'
})
export class InvestmentService {
    private readonly http = inject(HttpClient);

    getPaged() {
        return this.http.post(environment.apiUrl + '/Investments/GetPaged', {})
    }

    getById(id: number | string) {
        return this.http.get(environment.apiUrl + '/Investments/Get/' + id)
    }


    getAll() {
        return this.http.get(environment.apiUrl + '/Investments/GetAll')
    }




}
