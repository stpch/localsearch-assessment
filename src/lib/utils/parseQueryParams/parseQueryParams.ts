import { SearchParams } from '@/lib/types'

const defaultLimit = 100
const minLimit = 1
const maxLimit = 1000

const minOffset = 0

const getParam = (
    searchParams: SearchParams | URLSearchParams,
    key: string
) => {
    const value =
        searchParams instanceof URLSearchParams
            ? searchParams.get(key)
            : searchParams[key]

    if (Array.isArray(value)) {
        return value[0]
    }

    return value ?? undefined
}

const parseQueryParams = (searchParams: SearchParams | URLSearchParams) => {
    const parsedLimit = Number(getParam(searchParams, 'limit'))
    const parsedOffset = Number(getParam(searchParams, 'offset'))
    const searchQuery = getParam(searchParams, 'q')?.trim() || undefined

    const limit =
        Number.isInteger(parsedLimit) && parsedLimit >= minLimit
            ? Math.min(parsedLimit, maxLimit)
            : defaultLimit

    const offset =
        Number.isInteger(parsedOffset) && parsedOffset >= minOffset
            ? parsedOffset
            : minOffset

    return { limit, offset, searchQuery }
}

export default parseQueryParams
