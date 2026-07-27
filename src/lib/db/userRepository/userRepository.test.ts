import { User } from '@/lib/types'
import db from '../db'
import userRepository from './userRepository'

jest.mock('../db', () => ({
    __esModule: true,
    default: { prepare: jest.fn() },
}))

const all = jest.fn((): User[] => [])
const get = jest.fn((): undefined | { total: number } => ({ total: 0 }))

const prepare = db.prepare as jest.Mock
prepare.mockReturnValue({ all, get })

const dataStatement = () => prepare.mock.calls[0][0]
const totalStatement = () => prepare.mock.calls[1][0]

describe('userRepository', () => {
    describe('findMany', () => {
        test('returns all users when no params', async () => {
            userRepository.findMany()

            expect(dataStatement()).not.toContain('WHERE')
            expect(totalStatement()).toContain('COUNT(*)')
            expect(all).toHaveBeenCalledWith(-1, 0)
        })

        test('binds limit and offset', async () => {
            userRepository.findMany({ limit: 25, offset: 50 })
            expect(all).toHaveBeenCalledWith(25, 50)
        })

        test('filters by name or email', async () => {
            userRepository.findMany({ searchQuery: 'foo' })

            expect(dataStatement()).toContain(
                "WHERE first_name || ' ' || last_name LIKE ? OR email LIKE ?"
            )
            expect(totalStatement()).toContain('WHERE')
            expect(all).toHaveBeenCalledWith('%foo%', '%foo%', -1, 0)
            expect(get).toHaveBeenCalledWith('%foo%', '%foo%')
        })

        test('trims search query', async () => {
            userRepository.findMany({ searchQuery: '  foo  ' })
            expect(all).toHaveBeenCalledWith('%foo%', '%foo%', -1, 0)
        })

        test('returns data and total from statements', async () => {
            const data = [
                {
                    email: 'foo.bar@example.com',
                    firstName: 'Foo',
                    id: 1,
                    lastName: 'Bar',
                },
            ]

            all.mockReturnValueOnce(data)
            get.mockReturnValueOnce({ total: 42 })

            expect(userRepository.findMany()).toEqual({ data, total: 42 })
        })

        test('returns zero total when statement returns nothing', async () => {
            get.mockReturnValueOnce(undefined)
            expect(userRepository.findMany().total).toBe(0)
        })
    })
})
