export interface Investment {
    id: number;
    amount: number;
    refId: string;
    statusName: string;
    propertyName: string;
    investorName: string;
    iban: string;
    dividendsEquity: number;
    netEquity: number;
    collectedValue: number;
    earnedRent: number;
    createdDate: string; // ISO string, e.g., "2025-04-16T16:51:05.5801642"
    paymentType: string;
}


export interface InvestementCreation {
    id?: number,
    amount: number,
    refId?: string,
    statusId?: number,
    propertyId: number,
    investorId?: number,
    iban?: string,
    dividendsEquity?: number,
    netEquity?: number,
    paymentType?: string,
    language?: string
}


export interface InvestmentFilter {
    id?: number;
    amount?: number;
    statusId?: number;
    propertyStatus?: number;
    propertyId?: number;
    investorId?: number;
    createdDate?: string; // ISO 8601 date string
    nameEn?: string;
    nameAr?: string;
    isDeleted?: boolean;
}

export interface OrderByValue {
    colId: string;
    sort: string;
}

export interface InvestmentFilterRequest {
    pageNumber: number;
    pageSize: number;
    filter?: InvestmentFilter;
    orderByValue?: OrderByValue[];
}