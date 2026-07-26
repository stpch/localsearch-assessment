// istanbul ignore file
import '@/lib/global.css'
import { Metadata } from 'next'
import localFont from 'next/font/local'
import { FC, ReactNode } from 'react'

const panton = localFont({
    fallback: ['helvetica', 'arial', 'sans-serif'],
    src: [
        {
            path: '../lib/fonts/panton-regular.woff2',
            style: 'normal',
            weight: '400',
        },
        {
            path: '../lib/fonts/panton-semibold.woff2',
            style: 'normal',
            weight: '600',
        },
        {
            path: '../lib/fonts/panton-bold.woff2',
            style: 'normal',
            weight: '700',
        },
    ],
    variable: '--font-panton',
})

export const metadata: Metadata = {
    title: 'localsearch assessment',
}

interface Props {
    children: ReactNode
}

const RootLayout: FC<Props> = async props => (
    <html className={panton.variable} lang="en">
        <body>{props.children}</body>
    </html>
)

export default RootLayout
