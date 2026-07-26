// istanbul ignore file
import db from '@/lib/db'
import { User } from '@/lib/types'

interface QueryParams {
    limit?: number
    offset?: number
    orderBy?: 'asc' | 'desc'
    searchQuery?: string
}

const findMany = (params: QueryParams = {}) => {
    const orderBy = params.orderBy === 'desc' ? 'DESC' : 'ASC'
    const limit = params.limit || -1
    const offset = params.offset || 0
    const searchQuery = params.searchQuery?.trim()

    const where = searchQuery
        ? `WHERE first_name || ' ' || last_name LIKE ? OR email LIKE ?`
        : ''

    const statement = db.prepare<Array<number | string>, User>(`
        SELECT
            id,
            first_name AS firstName,
            last_name AS lastName,
            email
        FROM users
        ${where}
        ORDER BY first_name ${orderBy}
        LIMIT ? OFFSET ?
    `)

    const totalStatement = db.prepare<string[], { total: number }>(`
        SELECT COUNT(*) AS total
        FROM users
        ${where}
    `)

    const searchValues = searchQuery
        ? [`%${searchQuery}%`, `%${searchQuery}%`]
        : []

    return {
        data: statement.all(...searchValues, limit, offset),
        total: totalStatement.get(...searchValues)?.total ?? 0,
    }
}

export default { findMany }
