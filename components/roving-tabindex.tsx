import isHotkey from 'is-hotkey'
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useRef,
    useState,
    FocusEvent,
    KeyboardEvent,
    ComponentPropsWithoutRef,
} from 'react'

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
    elementsById: Map<string, HTMLElement>
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
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    const getOrderedItems = useCallback(() => {
        if (!wrapperRef.current || !elementsById) return []
        const domElements = Array.from(
            wrapperRef.current.querySelectorAll('[data-roving-tabindex-item]'),
        )

        return Array.from(elementsById)
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
                ref={wrapperRef}
                {...props}
            >
                {children}
            </div>
        </RovingTabindexContext.Provider>
    )
}

export const useRovingTabindex = function (id: string) {
    const { currentRovingTabindexValue, focus, onShiftTab, getOrderedItems } =
        useContext(RovingTabindexContext)
    return {
        currentRovingTabindexValue,
        onKeyDown: (e: KeyboardEvent) => {
            if (isHotkey('shift+tab', e)) {
                onShiftTab()
                return
            }

            const orderedItems = getOrderedItems()
            if (orderedItems.length === 0) return

            if (isHotkey('down', e) || isHotkey('right', e)) {
                const currIndex = orderedItems.findIndex(item => item.id === id)
                const candidates = wrapArray(orderedItems, currIndex + 1).map(item => item.element)
                focusFirst(candidates)
            } else if (isHotkey('up', e) || isHotkey('left', e)) {
                const currIndex = orderedItems.findIndex(item => item.id === id)
                const candidates = wrapArray(orderedItems.reverse(), currIndex + 1).map(
                    item => item.element,
                )
                focusFirst(candidates)
            } else if (isHotkey('home', e)) {
                focusFirst(orderedItems.map(item => item.element))
            } else if (isHotkey('end', e)) {
                focusFirst(orderedItems.map(item => item.element).reverse())
            }
        },
        onFocus: (e: FocusEvent) => {
            e.stopPropagation()
            focus(id)
        },
        ['data-roving-tabindex-item']: true,
    }
}
