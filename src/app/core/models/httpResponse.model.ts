export interface CustomHttpResponse<T = undefined> {
    data?: T,
    status: number,
    message: string,
}