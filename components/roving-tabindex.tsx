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
} from 'react'

import { ChainableMap } from 'lib/utils'

type RovingTabindexItem = {
    id: string
    element: HTMLElement
}

function wrapArray<T>(array: T[], startIndex: number) {
    return array.map((_, index) => array[(startIndex + index) % array.length])
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

type RovingTabindexRootBaseProps = {
    children: ReactNode | ReactNode[]
    active: string | null
    elementsById: ChainableMap<string, HTMLElement>
}

type RovingTabindexRootProps = RovingTabindexRootBaseProps &
    Omit<ComponentPropsWithoutRef<'div'>, keyof RovingTabindexRootBaseProps>

export function RovingTabindexRoot({
    children,
    active,
    elementsById,
    ...props
}: RovingTabindexRootProps) {
    const [isShiftTabbing, setIsShiftTabbing] = useState(false)
    const [currentRovingTabindexValue, setCurrentRovingTabindexValue] = useState<string | null>(
        null,
    )
    const rootRef = useRef<HTMLDivElement | null>(null)

    const getOrderedItems = useCallback(() => {
        if (!rootRef.current || !elementsById) return []
        const domElements = Array.from(
            rootRef.current.querySelectorAll('[data-roving-tabindex-item]'),
        )

        return Array.from(elementsById.toMap())
            .sort((a, b) => domElements.indexOf(a[1]) - domElements.indexOf(b[1]))
            .map(([id, element]) => ({ id, element }))
    }, [elementsById])

    return (
        <RovingTabindexContext.Provider
            value={{
                focus: function (id: string) {
                    setCurrentRovingTabindexValue(id)
                },
                onShiftTab: function () {
                    setIsShiftTabbing(true)
                },
                currentRovingTabindexValue,
                getOrderedItems,
            }}
        >
            <div
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
            </div>
        </RovingTabindexContext.Provider>
    )
}

export function getNextFocusable(orderedItems: RovingTabindexItem[], id: string): string {
    const currIndex = orderedItems.findIndex(item => item.id === id)
    return wrapArray(orderedItems, currIndex + 1).shift()?.id ?? id
}

export function getPrevFocusable(orderedItems: RovingTabindexItem[], id: string): string {
    const currIndex = orderedItems.reverse().findIndex(item => item.id === id)
    return wrapArray(orderedItems, currIndex + 1).shift()?.id ?? id
}

export function getFirstFocusable(orderedItems: RovingTabindexItem[]): string {
    return orderedItems.shift()?.id ?? ''
}

export function getLastFocusable(orderedItems: RovingTabindexItem[]): string {
    return orderedItems.reverse().shift()?.id ?? ''
}

export const useRovingTabindex = function (id: string) {
    const { currentRovingTabindexValue, focus, onShiftTab, getOrderedItems } =
        useContext(RovingTabindexContext)

    return useMemo(
        () => ({
            getOrderedItems,
            currentRovingTabindexValue,
            rovingProps: {
                onMouseDown: (e: MouseEvent) => {
                    focus(id)
                },
                onKeyDown: (e: KeyboardEvent) => {
                    if (isHotkey('shift+tab', e)) {
                        onShiftTab()
                        return
                    }
                },
                onFocus: (e: FocusEvent) => {
                    focus(id)
                },
                ['data-roving-tabindex-item']: true,
            },
        }),
        [currentRovingTabindexValue, focus, getOrderedItems, id, onShiftTab],
    )
}
