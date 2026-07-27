// istanbul ignore file
import { faker } from '@faker-js/faker'
import { NextRequest, NextResponse } from 'next/server'
import userRepository from '@/lib/db/repositories/userRepository'
import parseQueryParams from '@/lib/utils/parseQueryParams'

export const GET = async (request: NextRequest) => {
    // Artificial delay to simulate slightly slower external service
    await new Promise(resolve =>
        setTimeout(resolve, faker.number.int({ max: 250, min: 100 }))
    )

    const users = userRepository.findMany(
        parseQueryParams(request.nextUrl.searchParams)
    )

    return NextResponse.json(users)
}
