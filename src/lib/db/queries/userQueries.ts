import db from '@/lib/db'

interface QueryParams {
    limit?: number
    offset?: number
    orderBy?: 'asc' | 'desc'
}

const getAll = (params: QueryParams = {}): User[] => {
    const orderBy = params.orderBy === 'desc' ? 'DESC' : 'ASC'
    const limit = params.limit ?? -1
    const offset = params.offset ?? 0

    const statement = db.prepare<[number, number], User>(`
        SELECT
            id,
            first_name AS firstName,
            last_name AS lastName,
            email
        FROM users
        ORDER BY first_name ${orderBy}
        LIMIT ? OFFSET ?
    `)

    return statement.all(limit, offset)
}

export default { getAll }
