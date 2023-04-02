import clsx from 'clsx'
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

export type RovingTabindexItem = {
    id: string
    element: HTMLElement
}

type RovingTabindexContext = {
    focusableId: string | null
    setFocusableId: (id: string) => void
    onShiftTab: () => void
    getOrderedItems: () => RovingTabindexItem[]
    elements: MutableRefObject<Map<string, HTMLElement>>
}

const RovingTabindexContext = createContext<RovingTabindexContext>({
    focusableId: null,
    setFocusableId: () => {},
    onShiftTab: () => {},
    getOrderedItems: () => [],
    elements: { current: new Map<string, HTMLElement>() },
})

/**
 * Abstractions
 */

export function useRovingTabindex(id: string) {
    const {
        elements,
        getOrderedItems,
        setFocusableId,
        focusableId,
        onShiftTab,
    } = useContext(RovingTabindexContext)

    return {
        getOrderedItems,
        isFocusable: focusableId === id,
        getRovingProps: <T extends ElementType>(
            props: ComponentPropsWithoutRef<T>,
        ) => ({
            ...props,
            ref: (element: HTMLElement | null) => {
                if (element) {
                    elements.current.set(id, element)
                } else {
                    elements.current.delete(id)
                }
            },
            onMouseDown: (e: MouseEvent) => {
                props?.onMouseDown?.(e)
                if (e.target !== e.currentTarget) return
                setFocusableId(id)
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
                setFocusableId(id)
            },
            ['data-item']: true,
            tabIndex: focusableId === id ? 0 : -1,
        }),
    }
}

type RovingTabindexRootBaseProps<T> = {
    children: ReactNode | ReactNode[]
    as?: T
    valueId?: string
}

type RovingTabindexRootProps<T extends ElementType> =
    RovingTabindexRootBaseProps<T> &
        Omit<ComponentPropsWithoutRef<T>, keyof RovingTabindexRootBaseProps<T>>

export function RovingTabindexRoot<T extends ElementType>({
    children,
    valueId,
    as,
    ...props
}: RovingTabindexRootProps<T>) {
    const Component = as ?? 'div'
    const [focusableId, setFocusableId] = useState<string | null>(null)
    const [isShiftTabbing, setIsShiftTabbing] = useState(false)
    const elements = useRef(new Map<string, HTMLElement>())
    const ref = useRef<HTMLDivElement | null>(null)

    function getOrderedItems() {
        if (!ref.current) return []
        const elementsFromDOM = Array.from(
            ref.current.querySelectorAll<HTMLElement>('[data-item]'),
        )

        return Array.from(elements.current)
            .sort(
                (a, b) =>
                    elementsFromDOM.indexOf(a[1]) -
                    elementsFromDOM.indexOf(b[1]),
            )
            .map(([id, element]) => ({ id, element }))
    }

    return (
        <RovingTabindexContext.Provider
            value={{
                elements,
                getOrderedItems,
                setFocusableId,
                focusableId,
                onShiftTab: function () {
                    setIsShiftTabbing(true)
                },
            }}
        >
            <Component
                {...props}
                ref={ref}
                tabIndex={isShiftTabbing ? -1 : 0}
                onFocus={e => {
                    props?.onFocus?.(e)
                    if (e.target !== e.currentTarget || isShiftTabbing) return
                    const orderedItems = getOrderedItems()
                    if (orderedItems.length === 0) return

                    if (focusableId != null) {
                        elements.current.get(focusableId)?.focus()
                    } else if (valueId != null) {
                        elements.current.get(valueId)?.focus()
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

export function getNextFocusableId(
    orderedItems: RovingTabindexItem[],
    id: string,
): RovingTabindexItem | undefined {
    const currIndex = orderedItems.findIndex(item => item.id === id)
    return orderedItems.at(
        currIndex === orderedItems.length - 1 ? 0 : currIndex + 1,
    )
}

export function getPrevFocusableId(
    orderedItems: RovingTabindexItem[],
    id: string,
): RovingTabindexItem | undefined {
    const currIndex = orderedItems.findIndex(item => item.id === id)
    return orderedItems.at(currIndex === 0 ? -1 : currIndex - 1)
}
