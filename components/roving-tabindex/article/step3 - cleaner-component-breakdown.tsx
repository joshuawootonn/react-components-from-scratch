import isHotkey from 'is-hotkey'
import {
    MutableRefObject,
    createContext,
    ComponentPropsWithoutRef,
    useContext,
    useState,
    useRef,
} from 'react'

type RovingTabindexItem = {
    id: string
    element: HTMLElement
}

type RovingTabindexContextType = {
    focusable: string | null
    setFocusable: (id: string) => void
    getOrderedItems: () => RovingTabindexItem[]
    elements: MutableRefObject<Map<string, HTMLElement>>
}

const RovingTabindexContext = createContext<RovingTabindexContextType>({
    focusable: null,
    setFocusable: () => {},
    getOrderedItems: () => [],
    elements: { current: new Map<string, HTMLElement>() },
})

type BaseButtonProps = {
    children: string
}

type ButtonProps = BaseButtonProps & Omit<ComponentPropsWithoutRef<'button'>, keyof BaseButtonProps>

export function Button(props: ButtonProps) {
    const { elements, getOrderedItems, setFocusable, focusable } = useContext(RovingTabindexContext)
    return (
        <button
            ref={element => {
                if (element) {
                    elements.current.set(props.children, element)
                } else {
                    elements.current.delete(props.children)
                }
            }}
            onKeyDown={e => {
                if (isHotkey('right', e)) {
                    const items = getOrderedItems()
                    const currentIndex = items.findIndex(item => item.element === e.currentTarget)
                    const nextItem = items.at(
                        currentIndex === items.length - 1 ? 0 : currentIndex + 1,
                    )
                    if (nextItem != null) {
                        nextItem.element.focus()
                        setFocusable(nextItem.id)
                    }
                }
            }}
            tabIndex={props.children === focusable ? 0 : -1}
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
    const ref = useRef<HTMLDivElement | null>(null)

    function getOrderedItems() {
        if (!ref.current) return []
        const elementsFromDOM = Array.from(ref.current.querySelectorAll<HTMLElement>('[data-item]'))

        return Array.from(elements.current)
            .sort((a, b) => elementsFromDOM.indexOf(a[1]) - elementsFromDOM.indexOf(b[1]))
            .map(([id, element]) => ({ id, element }))
    }

    return (
        <RovingTabindexContext.Provider
            value={{ elements, getOrderedItems, setFocusable, focusable }}
        >
            <div ref={ref} className="space-x-5" data-root>
                <Button>button 1</Button>
                <span>hello</span>
                <Button>button 2</Button>
                <span>world</span>
                <Button>button 3</Button>
            </div>
        </RovingTabindexContext.Provider>
    )
}
