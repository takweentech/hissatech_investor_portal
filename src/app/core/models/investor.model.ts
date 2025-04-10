export interface InvestorSignUp {
    "idNumber": string,
    "email": string,
    "phoneNumber": string,
    "password": string,
    "confirmPassword": string,
    "sourceIncome": number,
    "incomeAmount": number
}

export interface InvestorSignIn {
    "userName": string,
    "password": string,
    "rememberMe": boolean
}