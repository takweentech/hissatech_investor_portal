export interface CustomHttpResponse<T = undefined> {
    data: T,
    status: number,
    message: string,
}


export interface PagedResponse<T = undefined> {
    data: T | T[],
    totalCount: number
}