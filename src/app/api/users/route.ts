import { NextRequest, NextResponse } from 'next/server'
import userQueries from '@/lib/db/queries/userQueries'

export const GET = async (request: NextRequest) => {
    const orderBy =
        request.nextUrl.searchParams.get('orderBy') === 'desc' ? 'desc' : 'asc'
    const limit = Number(request.nextUrl.searchParams.get('limit'))
    const offset = Number(request.nextUrl.searchParams.get('offset'))

    const users = userQueries.getAll({ limit, offset, orderBy })

    return NextResponse.json(users)
}
