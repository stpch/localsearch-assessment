// istanbul ignore file
import { FC } from 'react'
import DataTable from '@/containers/dataTable'
import userApi from '@/lib/api/userApi'

interface Props {
    limit: number
    offset: number
    searchQuery?: string
}

const UserTableLoader: FC<Props> = async props => {
    const users = await userApi.fetchMany(props)

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

export default UserTableLoader
