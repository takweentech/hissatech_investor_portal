

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