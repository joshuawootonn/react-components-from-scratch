import isHotkey from 'is-hotkey'
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useRef,
    useState,
    FocusEvent,
    MouseEvent,
    KeyboardEvent,
    ComponentPropsWithoutRef,
    useMemo,
    ElementType,
} from 'react'

import { ChainableMap } from 'lib/utils'

type RovingTabindexItem = {
    id: string
    element: HTMLElement
}

function focusFirst(candidates: HTMLElement[]) {
    const previousFocus = document.activeElement
    while (document.activeElement === previousFocus && candidates.length > 0) {
        candidates.shift()?.focus()
    }
}

const RovingTabindexContext = createContext<{
    currentRovingTabindexValue: string | null
    focus: (id: string) => void
    onShiftTab: () => void
    getOrderedItems: () => RovingTabindexItem[]
}>({
    currentRovingTabindexValue: null,
    focus: () => {},
    onShiftTab: () => {},
    getOrderedItems: () => [],
})

type RovingTabindexRootBaseProps<T> = {
    children: ReactNode | ReactNode[]
    active: string | null
    elementsById: ChainableMap<string, HTMLElement>
    as?: T
}

type RovingTabindexRootProps<T extends ElementType> = RovingTabindexRootBaseProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof RovingTabindexRootBaseProps<T>>

const NODE_SELECTOR = 'data-roving-tabindex-node'
const ROOT_SELECTOR = 'data-roving-tabindex-root'
export const NOT_FOCUSABLE_SELECTOR = 'data-roving-tabindex-not-focusable'
export function RovingTabindexRoot<T extends ElementType = 'div'>({
    children,
    active,
    elementsById,
    as,
    ...props
}: RovingTabindexRootProps<T>) {
    const Component = as || 'div'
    const [isShiftTabbing, setIsShiftTabbing] = useState(false)
    const [currentRovingTabindexValue, setCurrentRovingTabindexValue] = useState<string | null>(
        null,
    )
    const rootRef = useRef<HTMLDivElement | null>(null)

    const getOrderedItems = useCallback(() => {
        if (!rootRef.current || !elementsById) return []
        const domElements = Array.from(
            rootRef.current.querySelectorAll(
                `:where([${NODE_SELECTOR}=true]):not(:where([${NOT_FOCUSABLE_SELECTOR}=true] *))`,
            ),
        )

        return Array.from(elementsById.toMap())
            .sort((a, b) => domElements.indexOf(a[1]) - domElements.indexOf(b[1]))
            .map(([id, element]) => ({ id, element }))
    }, [elementsById])

    const value = useMemo(
        () => ({
            focus: function (id: string) {
                setCurrentRovingTabindexValue(id)
            },
            onShiftTab: function () {
                setIsShiftTabbing(true)
            },
            currentRovingTabindexValue,
            getOrderedItems,
        }),
        [
            currentRovingTabindexValue,
            getOrderedItems,
            setCurrentRovingTabindexValue,
            setIsShiftTabbing,
        ],
    )

    return (
        <RovingTabindexContext.Provider value={value}>
            <Component
                {...{ [ROOT_SELECTOR]: true }}
                tabIndex={isShiftTabbing ? -1 : 0}
                onFocus={e => {
                    if (e.target !== e.currentTarget) return
                    if (isShiftTabbing) return
                    const orderedItems = getOrderedItems()
                    if (orderedItems.length === 0) return

                    const candidates = [
                        elementsById.get(currentRovingTabindexValue ?? ''),
                        elementsById.get(active ?? ''),
                        ...orderedItems.map(i => i.element),
                    ].filter((element): element is HTMLElement => element != null)

                    focusFirst(candidates)
                }}
                onBlur={() => setIsShiftTabbing(false)}
                ref={rootRef}
                {...props}
            >
                {children}
            </Component>
        </RovingTabindexContext.Provider>
    )
}

export function getNextFocusable(orderedItems: RovingTabindexItem[], id: string): string {
    const currIndex = orderedItems.findIndex(item => item.id === id)
    return orderedItems.at(currIndex === orderedItems.length ? 0 : currIndex + 1)?.id ?? id
}

export function getParentFocusable(orderedItems: RovingTabindexItem[], id: string): string {
    const currentElement = orderedItems.find(item => item.id === id)?.element

    if (currentElement == null) return id

    let possibleParent = currentElement.parentElement

    while (
        possibleParent != null &&
        possibleParent.getAttribute(NODE_SELECTOR) == null &&
        possibleParent.getAttribute(ROOT_SELECTOR) == null
    ) {
        possibleParent = possibleParent?.parentElement ?? null
    }

    return orderedItems.find(item => item.element === possibleParent)?.id ?? id
}

export function getPrevFocusable(orderedItems: RovingTabindexItem[], id: string): string {
    const currIndex = orderedItems.findIndex(item => item.id === id)
    return orderedItems.at(currIndex === 0 ? -1 : currIndex - 1)?.id ?? id
}

export function getFirstFocusable(orderedItems: RovingTabindexItem[]): string {
    return orderedItems.at(0)?.id ?? ''
}

export function getLastFocusable(orderedItems: RovingTabindexItem[]): string {
    return orderedItems.at(-1)?.id ?? ''
}

export const useRovingTabindex = function (id: string) {
    const { currentRovingTabindexValue, focus, onShiftTab, getOrderedItems } =
        useContext(RovingTabindexContext)

    return useMemo(
        () => ({
            getOrderedItems,
            currentRovingTabindexValue,
            rovingProps: {
                onClick: (e: MouseEvent) => {
                    if (e.target !== e.currentTarget) return
                    focus(id)
                },
                onKeyDown: (e: KeyboardEvent) => {
                    if (e.target !== e.currentTarget) return
                    if (isHotkey('shift+tab', e)) {
                        onShiftTab()
                        return
                    }
                },
                onFocus: (e: FocusEvent) => {
                    if (e.target !== e.currentTarget) return
                    focus(id)
                },
                [NODE_SELECTOR]: true,
            },
        }),
        [currentRovingTabindexValue, focus, getOrderedItems, id, onShiftTab],
    )
}
