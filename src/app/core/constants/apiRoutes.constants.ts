import { environment } from "../../../environments/environment";

export const API_ENDPOINTS = {
    nafathRequest: `${environment.apiUrl}/Accounts/NafathRequest`,
    nafathCallback: `${environment.apiUrl}/Accounts/NafathCallback`,
    sendPhoneOtp: `${environment.apiUrl}/Accounts/SendPhoneOtp`,
    signupInvestor: `${environment.apiUrl}/Accounts/SignUpInvestor`,
    validateLogin: `${environment.apiUrl}/Accounts/ValidateLogin`,
    checkOtpRegister: `${environment.apiUrl}/Accounts/CheckOtpRegister`,
    checkOtpLogin: `${environment.apiUrl}/Accounts/CheckOtpLogin`,

    propertiesList: `${environment.apiUrl}/Property/GetPaged`,
    propertyDetails: `${environment.apiUrl}/Property/Get/`,
    getPropertyFile: `${environment.apiUrl}/Property/GetFile`,

    checkInvestment: `${environment.apiUrl}/Investments/ChickInvestment`,
    updateInvestment: `${environment.apiUrl}/Investments/update`,
    getSavedProperties: `${environment.apiUrl}/PropertySaved/GetPaged`,
    addSavedProperty: `${environment.apiUrl}/PropertySaved/Add`,
    deleteSavedProperty: `${environment.apiUrl}/PropertySaved/Delete/`,

    getFaq: `${environment.apiUrl}/BasicPages/GetFaq`,
    getTermsAndConditions: `${environment.apiUrl}/BasicPages/GetTermsAndConditions`,
    getPrivacyPolicy: `${environment.apiUrl}/BasicPages/GetPrivacyPolicy`,
    getAboutUs: `${environment.apiUrl}/BasicPages/GetAboutUs`,

    getPortfolio: `${environment.apiUrl}/Investors/GetPortfolio`,
    getInvestments: `${environment.apiUrl}/Investments/GetPaged`,
    getInvestmentsDetails: `${environment.apiUrl}/Investments/Get/`,
    getInvestmentsAll: `${environment.apiUrl}/Investments/GetAll`,

    updateProfile: `${environment.apiUrl}/Investors/UpdateProfile`,
    updateEmail: `${environment.apiUrl}/Accounts/UpdateEmail`,
    updatePhone: `${environment.apiUrl}/Accounts/UpdatePhone`,
    updatePassword: `${environment.apiUrl}/Accounts/UpdatePassword`,
    sendOtpPhoneEmail: `${environment.apiUrl}/Accounts/SendOtpPhoneEmail`,

    getBanksList: `${environment.apiUrl}/Bank/GetAll`,
    updateBankInformation: `${environment.apiUrl}/Investors/UpdateBankInformation`,

    getWithdrawalAll: `${environment.apiUrl}/Withdrawal/GetAll`,
    withdraw: `${environment.apiUrl}/Withdrawal/Add`,

    deleteAccount: `${environment.apiUrl}/Accounts/DeleteAccount`,
    getCertificate: `${environment.apiUrl}/Investments/GetCertificate`,
    finishPayment: `${environment.apiUrl}/Investments/FinishPayment`,
    cancelInvestment: `${environment.apiUrl}/Investments/Delete/`
};
