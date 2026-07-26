import { faker } from '@faker-js/faker'
import { FC } from 'react'
import DataTable from '@/containers/dataTable'
import userRepository from '@/lib/db/repositories/userRepository'

interface Props {
    limit: number
    offset: number
    searchQuery?: string
}

const UsersTableLoader: FC<Props> = async props => {
    // Artifical delay to simulate querying external database
    await new Promise(resolve =>
        setTimeout(resolve, faker.number.int({ max: 250, min: 100 }))
    )

    const users = userRepository.findMany(props)

    return (
        <DataTable
            {...props}
            columns={[
                { accessor: 'firstName', label: 'First name' },
                { accessor: 'lastName', label: 'Last name' },
                { accessor: 'email', label: 'Email' },
            ]}
            data={users.data}
            total={users.total}
        />
    )
}

export default UsersTableLoader
