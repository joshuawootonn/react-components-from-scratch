import { Josefin_Sans } from '@next/font/google'
import type { AppProps } from 'next/app'

import '../styles/globals.css'

const josie = Josefin_Sans({
    subsets: ['latin'],
    variable: '--josie-font',
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <main className={`${josie.variable} font-sans`}>
                <Component {...pageProps} />
            </main>
        </>
    )
}
