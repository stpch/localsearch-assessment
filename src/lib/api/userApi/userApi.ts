import { QueryParams, QueryResult, User } from '@/lib/types'

const baseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000/api'

const fetchMany = async (
    params: QueryParams = {}
): Promise<QueryResult<User>> => {
    const searchParams = new URLSearchParams()

    const values = {
        limit: params.limit,
        offset: params.offset,
        q: params.searchQuery,
    }

    for (const [key, value] of Object.entries(values)) {
        if (value !== undefined) {
            searchParams.set(key, String(value))
        }
    }

    const query = searchParams.size ? `?${searchParams}` : ''
    const response = await fetch(`${baseUrl}/users${query}`)

    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`)
    }

    return response.json()
}

export default {
    fetchMany,
}
