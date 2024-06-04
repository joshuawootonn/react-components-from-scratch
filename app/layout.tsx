import { Josefin_Sans } from 'next/font/google'
import '../styles/globals.css'
import { FathomPageView } from 'components/analytics/fathom'
import { Suspense } from 'react'

const josie = Josefin_Sans({
    subsets: ['latin'],
    variable: '--josie-font',
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${josie.variable} font-sans`}>
            <body>
                {children}
                <Suspense fallback={null}>
                    <FathomPageView />
                </Suspense>
            </body>
        </html>
    )
}
