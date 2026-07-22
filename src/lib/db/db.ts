import { faker } from '@faker-js/faker'
import Database from 'better-sqlite3'

declare global {
    var _db: Database.Database | undefined
}

const db = global._db ?? new Database(':memory:')

const createTables = () => {
    db.exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL
    )`)
}

const insertRandomData = () => {
    const result = db
        .prepare<[], { count: number }>('SELECT COUNT(*) as count FROM users')
        .get()!

    if (result.count) {
        return
    }

    const insertUsers = db.transaction((count: number) => {
        const statement = db.prepare(`
            INSERT INTO users (first_name, last_name, email)
            VALUES (?, ?, ?)
        `)

        for (let i = 0; i < count; i++) {
            const firstName = faker.person.firstName()
            const lastName = faker.person.lastName()

            const email = faker.internet
                .email({
                    firstName,
                    lastName,
                })
                .toLowerCase()

            statement.run(firstName, lastName, email)
        }
    })

    insertUsers(faker.number.int({ max: 200, min: 100 }))
}

if (!global._db) {
    createTables()
    insertRandomData()

    // Save for future hot reloads
    if (process.env.NODE_ENV !== 'production') {
        global._db = db
    }
}

export default db
