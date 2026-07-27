import userApi from './userApi'

const fetchMock = jest.fn()
global.fetch = fetchMock

describe('userApi', () => {
    describe('fetchMany', () => {
        test('queries without search params when no params', async () => {
            fetchMock.mockResolvedValue({
                json: async () => ({ data: [], total: 0 }),
                ok: true,
            })

            await expect(userApi.fetchMany()).resolves.toEqual({
                data: [],
                total: 0,
            })

            expect(fetchMock).toHaveBeenCalledWith(
                'http://localhost:3000/api/users'
            )
        })

        test('maps params to search params', async () => {
            fetchMock.mockResolvedValue({
                json: async () => ({ data: [], total: 0 }),
                ok: true,
            })

            await userApi.fetchMany({
                limit: 25,
                offset: 50,
                searchQuery: 'foo',
            })

            expect(fetchMock).toHaveBeenCalledWith(
                'http://localhost:3000/api/users?limit=25&offset=50&q=foo'
            )
        })

        test('throws when response not ok', async () => {
            fetchMock.mockResolvedValue({ ok: false, status: 500 })

            await expect(userApi.fetchMany()).rejects.toThrow(
                'Failed to fetch users: 500'
            )
        })
    })
})
