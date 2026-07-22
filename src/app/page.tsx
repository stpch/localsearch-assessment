// istanbul ignore file
import '@/lib/db'
import { FC } from 'react'
import userQueries from '@/lib/db/queries/userQueries'

const HomePage: FC = () => {
    const users = userQueries.getAll()

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <th>{user.firstName}</th>
                            <th>{user.lastName}</th>
                            <th>{user.email}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HomePage
