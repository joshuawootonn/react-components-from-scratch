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
    focusableId: string | null
    setFocusableId: (id: string) => void
    onShiftTab: () => void
    getOrderedItems: () => RovingTabindexItem[]
    elements: MutableRefObject<Map<string, HTMLElement>>
}

const RovingTabindexContext = createContext<RovingTabindexContextType>({
    focusableId: null,
    setFocusableId: () => {},
    onShiftTab: () => {},
    getOrderedItems: () => [],
    elements: { current: new Map<string, HTMLElement>() },
})

/**
 * Abstractions
 */

function useRovingTabindex(id: string) {
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
            onClick: (e: MouseEvent) => {
                props?.onClick?.(e)
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
    activeId?: string
}

type RovingTabindexRootProps<T extends ElementType> =
    RovingTabindexRootBaseProps<T> &
        Omit<ComponentPropsWithoutRef<T>, keyof RovingTabindexRootBaseProps<T>>

export function RovingTabindexRoot<T extends ElementType>({
    children,
    activeId,
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

export function getNextFocusable(
    orderedItems: RovingTabindexItem[],
    id: string,
): RovingTabindexItem | undefined {
    const currIndex = orderedItems.findIndex(item => item.id === id)
    return orderedItems.at(
        currIndex === orderedItems.length - 1 ? 0 : currIndex + 1,
    )
}

export function getPrevFocusable(
    orderedItems: RovingTabindexItem[],
    id: string,
): RovingTabindexItem | undefined {
    const currIndex = orderedItems.findIndex(item => item.id === id)
    return orderedItems.at(currIndex === 0 ? -1 : currIndex - 1)
}

/**
 * Usage
 */

type BaseButtonProps = {
    children: string
}

type ButtonProps = BaseButtonProps &
    Omit<ComponentPropsWithoutRef<'button'>, keyof BaseButtonProps>

export function Button(props: ButtonProps) {
    const { getOrderedItems, getRovingProps } = useRovingTabindex(
        props.children,
    )
    return (
        <button
            {...getRovingProps<'button'>({
                onKeyDown: e => {
                    props?.onKeyDown?.(e)
                    const items = getOrderedItems()
                    let nextItem: RovingTabindexItem | undefined
                    if (isHotkey('right', e)) {
                        nextItem = getNextFocusable(items, props.children)
                    } else if (isHotkey('left', e)) {
                        nextItem = getPrevFocusable(items, props.children)
                    }
                    nextItem?.element.focus()
                },
                ...props,
            })}
        >
            {props.children}
        </button>
    )
}

export function ButtonGroup() {
    const [activeId, setActiveId] = useState('button 2')

    return (
        <RovingTabindexRoot className="space-x-5" as="div" activeId={activeId}>
            <Button onClick={() => setActiveId('button 1')}>button 1</Button>
            <Button onClick={() => setActiveId('button 2')}>button 2</Button>
            <Button onClick={() => setActiveId('button 3')}>button 3</Button>
        </RovingTabindexRoot>
    )
}
