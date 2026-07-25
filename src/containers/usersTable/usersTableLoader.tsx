import { faker } from '@faker-js/faker'
import { FC } from 'react'
import DataTable from '@/components/dataTable'
import userRepository from '@/lib/db/repositories/userRepository'
import { DataTablePageProps } from '@/lib/types'

const UsersTableLoader: FC<DataTablePageProps> = async props => {
    // Artifical delay to simulate querying external database
    await new Promise(resolve =>
        setTimeout(resolve, faker.number.int({ max: 300, min: 50 }))
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
