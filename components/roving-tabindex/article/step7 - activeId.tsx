import isHotkey from 'is-hotkey'
import {
    MutableRefObject,
    createContext,
    ComponentPropsWithoutRef,
    useContext,
    useState,
    useRef,
    ElementType,
    ReactNode,
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

/**
 * Abstractions
 */

function useRovingTabindex(id: string) {
    const { elements, getOrderedItems, setFocusable, focusable, onShiftTab } =
        useContext(RovingTabindexContext)

    return {
        getOrderedItems,
        isFocusable: focusable === id,
        getRovingProps: <T extends ElementType>(props: ComponentPropsWithoutRef<T>) => ({
            ...props,
            ref: (element: HTMLElement | null) => {
                if (element) {
                    elements.current.set(id, element)
                } else {
                    elements.current.delete(id)
                }
            },
            onClick: (e: MouseEvent) => {
                props?.onClick?.(e)
                if (e.target !== e.currentTarget) return
                setFocusable(id)
            },
            onKeyDown: (e: KeyboardEvent) => {
                props?.onKeyDown?.(e)
                if (e.target !== e.currentTarget) return
                if (isHotkey('shift+tab', e)) {
                    onShiftTab()
                    return
                }
            },
            onFocus: (e: FocusEvent) => {
                props?.onFocus?.(e)
                if (e.target !== e.currentTarget) return
                setFocusable(id)
            },
            ['data-item']: true,
            tabIndex: focusable === id ? 0 : -1,
        }),
    }
}

type RovingTabindexRootBaseProps<T> = {
    children: ReactNode | ReactNode[]
    as?: T
    activeId?: string
}

type RovingTabindexRootProps<T extends ElementType> = RovingTabindexRootBaseProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof RovingTabindexRootBaseProps<T>>

export function RovingTabindexRoot<T extends ElementType>({
    children,
    activeId,
    as,
    ...props
}: RovingTabindexRootProps<T>) {
    const Component = as ?? 'div'
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
            <Component
                {...props}
                data-root
                tabIndex={isShiftTabbing ? -1 : 0}
                onFocus={e => {
                    props?.onFocus?.(e)
                    if (e.target !== e.currentTarget || isShiftTabbing) return
                    const orderedItems = getOrderedItems()
                    if (orderedItems.length === 0) return

                    if (focusable != null) {
                        elements.current.get(focusable)?.focus()
                    } else if (activeId != null) {
                        elements.current.get(activeId)?.focus()
                    } else {
                        orderedItems.at(0)?.element.focus()
                    }
                }}
                onBlur={e => {
                    props?.onBlur?.(e)
                    setIsShiftTabbing(false)
                }}
            >
                {children}
            </Component>
        </RovingTabindexContext.Provider>
    )
}

/**
 * Usage
 */

type BaseButtonProps = {
    children: string
}

type ButtonProps = BaseButtonProps & Omit<ComponentPropsWithoutRef<'button'>, keyof BaseButtonProps>

export function Button(props: ButtonProps) {
    const { getOrderedItems, getRovingProps } = useRovingTabindex(props.children)
    return (
        <button
            {...getRovingProps<'button'>({
                onKeyDown: e => {
                    props?.onKeyDown?.(e)
                    if (isHotkey('right', e)) {
                        const items = getOrderedItems()
                        const currentIndex = items.findIndex(
                            item => item.element === e.currentTarget,
                        )
                        const nextItem = items.at(
                            currentIndex === items.length - 1 ? 0 : currentIndex + 1,
                        )
                        nextItem?.element.focus()
                    }
                },
                ...props,
            })}
        >
            {props.children}
        </button>
    )
}

export function MyComponent() {
    const [activeId, setActiveId] = useState('button 2')

    return (
        <RovingTabindexRoot className="space-x-5" as="div" activeId={activeId}>
            <Button onClick={() => setActiveId('button 1')}>button 1</Button>
            <Button onClick={() => setActiveId('button 2')}>button 2</Button>
            <Button onClick={() => setActiveId('button 3')}>button 3</Button>
        </RovingTabindexRoot>
    )
}
