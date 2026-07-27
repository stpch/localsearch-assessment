// istanbul ignore file
import { NextRequest, NextResponse } from 'next/server'
import userRepository from '@/lib/db/repositories/userRepository'

export const GET = async (request: NextRequest) => {
    const orderBy =
        request.nextUrl.searchParams.get('orderBy') === 'desc' ? 'desc' : 'asc'
    const limit = Number(request.nextUrl.searchParams.get('limit'))
    const offset = Number(request.nextUrl.searchParams.get('offset'))

    const users = userRepository.findMany({ limit, offset, orderBy })

    return NextResponse.json({ data: users.data, total: users.total })
}
