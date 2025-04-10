

export interface User {
    id: number
    userId: string
    name: string
    email: string
    phone: string
    birthDay: number
    birthMonth: number
    birthYear: number
    idNumber: string
    idExpiryDay: number
    idExpiryMonth: number
    idExpiryYear: number
    gender: number
    iban: string
    personalIBAN: any
    ibanBalance: number
    bankTitle: string
    image: any
    isForeign: boolean
    nationalityAr: string
    nationalityEn: any
    nationalityCode: number
    locked: boolean
    sourceIncome: number
    incomeAmount: number
    bankId: any
    bankName: any
}

export interface NafathData {
    sub: string;
    fatherName: string;
    gender: string;
    dateOfBirthG: string;
    transId: string;
    dateOfBirthH: string;
    grandFatherName: string;
    iss: string;
    nationalityCode: number;
    nin: string;
    englishThirdName: string;
    idVersionNumber: number;
    familyName: string;
    exp: number;
    idIssuePlace: string;
    iat: number;
    jti: string;
    nationalAddress: NationalAddress[];
    idExpiryDateG: string;
    idIssueDate: string;
    englishFirstName: string;
    englishLastName: string;
    idExpiryDate: string;
    aud: string;
    firstName: string;
    nbf: number;
    personId: number;
    nationality: string;
    serviceName: string;
    jwks_uri: string;
    idIssueDateG: string;
    englishSecondName: string;
    status: string;
}

interface NationalAddress {
    city: string;
    shortAddress: string;
    additionalNumber: string;
    regionName: string;
    streetL2: string;
    isPrimaryAddress: string;
    cityId: string;
    regionNameL2: string;
    districtL2: string;
    streetName: string;
    regionId: string;
    district: string;
    buildingNumber: string;
    postCode: string;
    locationCoordinates: string;
    cityL2: string;
    investorId: any;
    investor: any;
    id: number;
    createdById: any;
    createdDate: string;
    modifiedDate: string;
    modifiedById: any;
    isDeleted: boolean;
    createdByNameEn: any;
    createdByNameAr: any;
    isActive: boolean;
    ipAddress: any;
}

