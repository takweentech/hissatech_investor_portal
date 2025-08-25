import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class BankService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl: string = 'Bank';



}
