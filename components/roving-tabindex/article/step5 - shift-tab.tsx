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
    onShiftTab: () => void
    getOrderedItems: () => RovingTabindexItem[]
    elements: MutableRefObject<Map<string, HTMLElement>>
}

const RovingTabindexContext = createContext<RovingTabindexContextType>({
    focusable: null,
    setFocusable: () => {},
    onShiftTab: () => {},
    getOrderedItems: () => [],
    elements: { current: new Map<string, HTMLElement>() },
})

type BaseButtonProps = {
    children: string
}

type ButtonProps = BaseButtonProps & Omit<ComponentPropsWithoutRef<'button'>, keyof BaseButtonProps>

export function Button(props: ButtonProps) {
    const { elements, getOrderedItems, setFocusable, focusable, onShiftTab } =
        useContext(RovingTabindexContext)
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
                if (isHotkey('shift+tab', e)) {
                    onShiftTab()
                    return
                }
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
    const [focusable, setFocusable] = useState<string | null>(null)
    const [isShiftTabbing, setIsShiftTabbing] = useState(false)
    const elements = useRef(new Map<string, HTMLElement>())

    function getOrderedItems() {
        const elementsFromDOM = Array.from(
            document.querySelectorAll<HTMLElement>('[data-root] [data-item]'),
        )

        return Array.from(elements.current)
            .sort((a, b) => elementsFromDOM.indexOf(a[1]) - elementsFromDOM.indexOf(b[1]))
            .map(([id, element]) => ({ id, element }))
    }

    return (
        <RovingTabindexContext.Provider
            value={{
                elements,
                getOrderedItems,
                setFocusable,
                focusable,
                onShiftTab: function () {
                    setIsShiftTabbing(true)
                },
            }}
        >
            <div
                className="space-x-5"
                data-root
                tabIndex={isShiftTabbing ? -1 : 0}
                onFocus={e => {
                    if (e.target !== e.currentTarget || isShiftTabbing) return
                    const orderedItems = getOrderedItems()
                    if (orderedItems.length === 0) return

                    if (focusable != null) {
                        elements.current.get(focusable)?.focus()
                    } else {
                        orderedItems.at(0)?.element.focus()
                    }
                }}
                onBlur={() => setIsShiftTabbing(false)}
            >
                <Button>button 1</Button>
                <Button>button 2</Button>
                <Button>button 3</Button>
            </div>
        </RovingTabindexContext.Provider>
    )
}
