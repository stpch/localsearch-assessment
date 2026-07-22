// istanbul ignore file
import '@/lib/global.css'
import { FC, ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const RootLayout: FC<Props> = async props => (
    <html lang="en">
        <body>{props.children}</body>
    </html>
)

export default RootLayout
