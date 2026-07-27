export type SearchParams = Record<string, string | string[] | undefined>

export interface QueryResult<T> {
    data: T[]
    total: number
}

export interface QueryParams {
    limit?: number
    offset?: number
    searchQuery?: string
}

export interface User {
    email: string
    firstName: string
    id: number
    lastName: string
}
