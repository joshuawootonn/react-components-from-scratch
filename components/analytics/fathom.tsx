'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import * as Fathom from 'fathom-client'
import { useEffect } from 'react'

if (typeof window !== 'undefined') {
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_ID ?? '', {
        includedDomains: ['react-components-from-scratch.vercel.app'],
    })
}

export function FathomPageView() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        Fathom.trackPageview()
    }, [pathname, searchParams])

    return null
}
