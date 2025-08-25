export interface UpdatePhoneEmailDto {
    newEmail: string,
    phoneNumber: string,
    otp: string,
    hashedOtp?: string

}


export interface UpdatePasswordDto {
    oldPassword: string,
    password: string

}
