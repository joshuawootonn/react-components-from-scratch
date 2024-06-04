import { Josefin_Sans } from 'next/font/google'
import * as Fathom from 'fathom-client'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import '../styles/globals.css'

const josie = Josefin_Sans({
    subsets: ['latin'],
    variable: '--josie-font',
})

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()

    useEffect(() => {
        Fathom.load(process.env.NEXT_PUBLIC_FATHOM_ID ?? '', {
            includedDomains: ['react-components-from-scratch.vercel.app'],
        })

        router.events.on('routeChangeComplete', onRouteChangeComplete)

        return () => {
            router.events.off('routeChangeComplete', onRouteChangeComplete)
        }

        function onRouteChangeComplete() {
            Fathom.trackPageview()
        }
    }, [])

    return (
        <main className={`${josie.variable} font-sans`}>
            <Component {...pageProps} />
        </main>
    )
}
