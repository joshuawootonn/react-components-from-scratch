import isHotkey from 'is-hotkey'
import {
    MutableRefObject,
    ComponentPropsWithoutRef,
    useState,
    useRef,
    KeyboardEvent,
} from 'react'

type BaseButtonProps = {
    children: string
    focusableId: string
    elements: MutableRefObject<Map<string, HTMLElement>>
}

type ButtonProps = BaseButtonProps &
    Omit<ComponentPropsWithoutRef<'button'>, keyof BaseButtonProps>

export function Button(props: ButtonProps) {
    return (
        <button
            className="border-2 border-black px-2 pt-0.5 focus:outline-dashed focus:outline-offset-4 focus:outline-2 focus:outline-black"
            ref={element => {
                if (element) {
                    props.elements.current.set(props.children, element)
                } else {
                    props.elements.current.delete(props.children)
                }
            }}
            tabIndex={props.children === props.focusableId ? 0 : -1}
            data-item
            {...props}
        >
            {props.children}
        </button>
    )
}

export function ButtonGroup() {
    const [focusableId, setFocusableId] = useState('button 1')
    const elements = useRef(new Map<string, HTMLElement>())
    const ref = useRef<HTMLDivElement | null>(null)

    function onKeyDown(e: KeyboardEvent) {
        if (isHotkey('right', e)) {
            if (!ref.current) return
            const elementsFromDOM = Array.from(
                ref.current.querySelectorAll<HTMLElement>('[data-item]'),
            )

            const items = Array.from(elements.current)
                .sort(
                    (a, b) =>
                        elementsFromDOM.indexOf(a[1]) -
                        elementsFromDOM.indexOf(b[1]),
                )
                .map(([id, element]) => ({ id, element }))

            const currentIndex = items.findIndex(
                item => item.element === e.currentTarget,
            )
            const nextItem = items.at(
                currentIndex === items.length - 1 ? 0 : currentIndex + 1,
            )
            if (nextItem != null) {
                nextItem.element.focus()
                setFocusableId(nextItem.id)
            }
        }
    }

    return (
        <div ref={ref} className="space-x-5">
            <Button
                focusableId={focusableId}
                elements={elements}
                onKeyDown={onKeyDown}
            >
                button 1
            </Button>
            <span>hello</span>
            <Button
                focusableId={focusableId}
                elements={elements}
                onKeyDown={onKeyDown}
            >
                button 2
            </Button>
            <span>world</span>
            <Button
                focusableId={focusableId}
                elements={elements}
                onKeyDown={onKeyDown}
            >
                button 3
            </Button>
        </div>
    )
}
