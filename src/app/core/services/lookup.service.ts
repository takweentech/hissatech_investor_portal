import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LookupService {



  getIncomeSources() {
    return [
      { name: "Retirement | تقاعد", value: "1" },
      { name: "Business Activity | نشاط تجاري", value: "2" },
      { name: "Real Estate | عقارات", value: "3" },
      { name: "Stock investments | استثمارات في الأسهم", value: "4" },
      { name: "Legacy | ورث", value: "5" }
    ]
  }



  getIncomeAmounts() {
    return [
      { name: "100,000 or Less | 100,000 أو أقل", value: "1" },
      { name: "100,001 - 300,000 | 100,001 - 300,000", value: "2" },
      { name: "300,001 - 600,000 | 300,001 - 600,000", value: "3" },
      { name: "600,001 - 1,500,000 | 600,001 - 1,500,000", value: "4" },
      { name: "1,500,001 - 5,000,000 | 1,500,001 - 5,000,000", value: "5" },
      { name: "5,000,001 - 10,000,000 | 5,000,001 - 10,000,000", value: "6" },
      { name: "10,000,001 - 50,000,000 | 10,000,001 - 50,000,000", value: "7" },
      { name: "More than 50,000,000 | أكثر من 50,000,000", value: "8" }
    ]
  }

  getBankInfo(): { beneficiaryName: string, bankName: string, IBAN: string } {
    return { beneficiaryName: "hissaTechCompany", bankName: "Arab National Bank", IBAN: "SA6730100761310000002384" }
  }
}
