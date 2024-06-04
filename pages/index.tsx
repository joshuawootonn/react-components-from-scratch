import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
    return (
        <>
            <Head>
                <title>React components and interactions from scratch</title>
                <meta
                    name="description"
                    content="This site/repo is a collection of components and
                    interactions primarily created so that I could learn. Along
                    the way I wrote blog post about each of them, and created
                    these demos to hopefully benefit you. I talk about ARIA
                    guidelines, sexy animations, extensibility, and UX trends."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="max-w-3xl p-4 lg:p-8 mx-auto prose prose-headings:font-700">
                <h1 className="font-sans">
                    React components from scratch{' '}
                    <span className="inline-block text-blue -translate-y-8 rotate-12 -translate-x-3 text-sm">
                        WIP
                    </span>
                </h1>
                <p>
                    This site/repo is a collection of components and
                    interactions primarily created so that I could learn. Along
                    the way I wrote blog post about each of them, and created
                    these demos to hopefully benefit you. I talk about ARIA
                    guidelines, sexy animations, extensibility, and UX trends.
                </p>
                <h2>Components:</h2>
                <ol>
                    <li>
                        <Link href="/slider">Slider &#x2197;</Link>
                    </li>
                    <li>
                        <Link href="/vercel-tabs">
                            Vercel&apos;s Tab component &#x2197;
                        </Link>
                    </li>
                    <li>
                        <Link href="/disclosure">Disclosure &#x2197;</Link>
                    </li>
                    <li>
                        <Link href="/toggle-group">Toggle Group &#x2197;</Link>
                    </li>
                    <li>
                        <Link href="/treeview">Treeview &#x2197;</Link>
                    </li>
                    <li>
                        <Link href="/sidebar">Sidebar &#x2197;</Link>
                    </li>
                </ol>

                <h2>Interactions:</h2>
                <ol>
                    <li>
                        <Link href="/roving-tabindex">
                            Roving tabindex &#x2197;
                        </Link>
                    </li>
                    <li>
                        <Link href="/radix-menu-to-modal">
                            Radix menu to modal &#x2197;
                        </Link>
                    </li>
                </ol>
            </div>
        </>
    )
}
