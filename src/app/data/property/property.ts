export interface SliderImage {
    id: number;
    path: string;
}

export interface FeatureValue {
    id: number;
    value: string;
    name: string;
    code: string | null;
    unit: string | null;
}

export interface MarketTracker {
    id: number;
    marketValue: number;
    percentage: number;
    isIniti: boolean;
    marketDate: string;
    propertyId: number;
    name: string;
}

export interface Property {
    id: number;
    displayName: string;
    amount: number;
    miniSubscription: number;
    unitPrice: number;
    miniNumberofUnits: number;
    numberofUnits: number;
    hissatechEquityPercentage: number;
    hissatechEquityPercentagePerUnit: number;
    maxSubscription: number;
    exitPrice: number;
    propertyCost: number;
    start: string;
    end: string;
    about: string;
    annualIncome: number;
    roi: number;
    netIncome: number;
    annualExpectedReturn: number;
    classification: string;
    lat: number;
    long: number;
    note: string;
    pioneerId: number;
    statusId: number;
    statusName: string;
    categoryName: string | null;
    numberOfInvestors: number;
    collectedValue: number;
    totalAmount: number;
    remainingAmount: number;
    collectMessage: string | null;
    isCollectedMessage: boolean;
    isSavedProperty: boolean;
    closeDate: string | null;
    tourLink: string;
    documents: {
        name: string,
        path: string,
    }[];
    sliderImages: SliderImage[];
    featureValues: FeatureValue[];
    marketTrackers: MarketTracker[];
}


export interface PropertyRequestFilter {
    pageNumber: number,
    pageSize?: number,
    filter?: {
        id?: number,
        status?: number,
        amount?: number,
        classification?: string,
        statusId?: number,
        name?: string,
        nameEn?: string,
        nameAr?: string,
        isDeleted?: boolean
    },
    orderByValue?: [
        {
            colId?: string,
            sort?: string
        }
    ]

};