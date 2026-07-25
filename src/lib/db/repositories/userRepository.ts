import db from '@/lib/db'
import { User } from '@/lib/types'

interface QueryParams {
    limit?: number
    offset?: number
    orderBy?: 'asc' | 'desc'
}

const findMany = (params: QueryParams = {}) => {
    const orderBy = params.orderBy === 'desc' ? 'DESC' : 'ASC'
    const limit = params.limit || -1
    const offset = params.offset || 0

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

    const totalStatement = db.prepare<[], { total: number }>(`
        SELECT COUNT(*) AS total
        FROM users
    `)

    return {
        data: statement.all(limit, offset),
        total: totalStatement.get()?.total ?? 0,
    }
}

export default { findMany }
