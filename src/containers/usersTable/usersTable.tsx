import { FC, Suspense } from 'react'
import { DataTablePageProps } from '@/lib/types'
import UsersTableLoader from './usersTableLoader'

const UsersTable: FC<DataTablePageProps> = props => (
    <Suspense fallback={<div>Loading ...</div>}>
        <UsersTableLoader {...props} />
    </Suspense>
)

export default UsersTable
