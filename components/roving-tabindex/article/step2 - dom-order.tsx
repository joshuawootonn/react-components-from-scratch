import isHotkey from 'is-hotkey'
import { MutableRefObject, ComponentPropsWithoutRef, useState, useRef, KeyboardEvent } from 'react'

type BaseButtonProps = {
    children: string
    focusable: string
    elements: MutableRefObject<Map<string, HTMLElement>>
}

type ButtonProps = BaseButtonProps & Omit<ComponentPropsWithoutRef<'button'>, keyof BaseButtonProps>

export function Button(props: ButtonProps) {
    return (
        <button
            ref={element => {
                if (element) {
                    props.elements.current.set(props.children, element)
                } else {
                    props.elements.current.delete(props.children)
                }
            }}
            tabIndex={props.children === props.focusable ? 0 : -1}
            data-item
            {...props}
        >
            {props.children}
        </button>
    )
}

export function MyComponent() {
    const [focusable, setFocusable] = useState('button 1')
    const elements = useRef(new Map<string, HTMLElement>())

    function onKeyDown(e: KeyboardEvent) {
        if (isHotkey('right', e)) {
            const elementsFromDOM = Array.from(
                document.querySelectorAll<HTMLElement>('[data-root] [data-item]'),
            )

            const items = Array.from(elements.current)
                .sort((a, b) => elementsFromDOM.indexOf(a[1]) - elementsFromDOM.indexOf(b[1]))
                .map(([id, element]) => ({ id, element }))

            const currentIndex = items.findIndex(item => item.element === e.currentTarget)
            const nextItem = items.at(currentIndex === items.length - 1 ? 0 : currentIndex + 1)
            if (nextItem != null) {
                nextItem.element.focus()
                setFocusable(nextItem.id)
            }
        }
    }

    return (
        <div className="space-x-5" data-root>
            <Button focusable={focusable} elements={elements} onKeyDown={onKeyDown}>
                button 1
            </Button>
            <span>hello</span>
            <Button focusable={focusable} elements={elements} onKeyDown={onKeyDown}>
                button 2
            </Button>
            <span>world</span>
            <Button focusable={focusable} elements={elements} onKeyDown={onKeyDown}>
                button 3
            </Button>
        </div>
    )
}
