import Link from 'next/link'
import { useState, KeyboardEvent, useRef } from 'react'

function MyComponent() {
    return (
        <div className="space-x-5">
            <button>button 1</button>
            <button>button 2</button>
            <button>button 3</button>
        </div>
    )
}

function MyComponent2() {
    const [options] = useState(['button 1', 'button 2', 'button 3'])
    const elements = useRef(new Map<string, HTMLElement>())

    return (
        <div className="space-x-5">
            {options.map((button, key) => (
                <button
                    key={key}
                    onKeyDown={() => {
                        const currentIndex = options.findIndex(text => text === button)
                        const nextIndex = currentIndex === options.length - 1 ? 0 : currentIndex + 1
                        elements.current.get(options[nextIndex])?.focus()
                    }}
                    ref={element => {
                        if (element) {
                            elements.current.set(button, element)
                        } else {
                            elements.current.delete(button)
                        }
                    }}
                >
                    {button}
                </button>
            ))}
        </div>
    )
}

function Button3(props: any) {
    return (
        <button
            ref={element => {
                if (element) {
                    props.elements.current.set(props.children, element)
                } else {
                    props.elements.current.delete(props.children)
                }
            }}
            data-item
            {...props}
        >
            {props.children}
        </button>
    )
}

function MyComponent3() {
    const elements = useRef(new Map<string, HTMLElement>())

    function onKeyDown(e: KeyboardEvent) {
        const elementsFromDOM = Array.from(
            document.querySelectorAll<HTMLElement>('[data-root] > [data-item]'),
        )

        const items = Array.from(elements.current)
            .sort((a, b) => elementsFromDOM.indexOf(a[1]) - elementsFromDOM.indexOf(b[1]))
            .map(([id, element]) => ({ id, element }))

        const currentIndex = items.findIndex(item => item.element === e.currentTarget)
        const nextItem = items.at(currentIndex === items.length - 1 ? 0 : currentIndex + 1)
        nextItem?.element.focus()
    }

    return (
        <div className="space-x-5" data-root>
            <Button3 elements={elements} onKeyDown={onKeyDown}>
                button 1
            </Button3>
            <span>hello</span>
            <Button3 elements={elements} onKeyDown={onKeyDown}>
                button 2
            </Button3>
            <span>world</span>
            <Button3 elements={elements} onKeyDown={onKeyDown}>
                button 3
            </Button3>
        </div>
    )
}

export default function Page() {
    return (
        <div className="max-w-5xl p-4 lg:p-8 mx-auto prose prose-headings:font-700 ">
            <div className="flex flex-row justify-between items-start">
                <h1 className="font-sans">Treeview (wip)</h1>
                <Link href="/">Back to the full list of components</Link>
            </div>
            <p>
                This treeview is currently marked as wip as I write the related post explaining it.
                But the code is really there so check it out if you need to do something similar.
            </p>
            <h2>Step 1</h2>
            <MyComponent />

            <h2>Step 2</h2>
            <MyComponent2 />

            <h2>Step 3</h2>
            <MyComponent3 />
        </div>
    )
}
