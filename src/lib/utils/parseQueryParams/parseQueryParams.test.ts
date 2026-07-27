import parseQueryParams from './parseQueryParams'

describe('parseQueryParams', () => {
    describe('falls back to defaults', () => {
        test('when params missing', async () => {
            const defaults = { limit: 100, offset: 0, searchQuery: undefined }

            expect(parseQueryParams({})).toEqual(defaults)
            expect(parseQueryParams(new URLSearchParams())).toEqual(defaults)
        })

        test('for non-integer values', async () => {
            expect(
                parseQueryParams({ limit: 'foo', offset: 'bar' })
            ).toMatchObject({ limit: 100, offset: 0 })

            expect(
                parseQueryParams({ limit: '1.5', offset: '1.5' })
            ).toMatchObject({ limit: 100, offset: 0 })

            expect(parseQueryParams({ limit: '', offset: '' })).toMatchObject({
                limit: 100,
                offset: 0,
            })
        })

        test('for out of range values', async () => {
            expect(
                parseQueryParams({ limit: '0', offset: '-1' })
            ).toMatchObject({ limit: 100, offset: 0 })

            expect(parseQueryParams({ limit: '-5' })).toMatchObject({
                limit: 100,
            })
        })
    })

    describe('reads params', () => {
        test('from record', async () => {
            expect(
                parseQueryParams({ limit: '25', offset: '50', q: 'foo' })
            ).toEqual({ limit: 25, offset: 50, searchQuery: 'foo' })
        })

        test('from URLSearchParams', async () => {
            const searchParams = new URLSearchParams('limit=25&offset=50&q=foo')

            expect(parseQueryParams(searchParams)).toEqual({
                limit: 25,
                offset: 50,
                searchQuery: 'foo',
            })
        })
    })

    test('clamps limit to maximum', async () => {
        expect(parseQueryParams({ limit: '99999' })).toMatchObject({
            limit: 1000,
        })
    })

    test('treats blank search query as absent', async () => {
        expect(parseQueryParams({ q: '   ' })).toMatchObject({
            searchQuery: undefined,
        })
    })

    test('trims search query', async () => {
        expect(parseQueryParams({ q: '  foo  ' })).toMatchObject({
            searchQuery: 'foo',
        })
    })

    test('uses first value of repeated params', async () => {
        expect(
            parseQueryParams({ limit: ['25', '50'], q: ['foo', 'bar'] })
        ).toMatchObject({ limit: 25, searchQuery: 'foo' })
    })
})
