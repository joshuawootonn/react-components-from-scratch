import clsx from 'clsx'
import isHotkey from 'is-hotkey'
import {
    createContext,
    ReactNode,
    useContext,
    useMemo,
    useState,
    KeyboardEvent,
    MouseEvent,
    FocusEvent,
    ComponentPropsWithoutRef,
    useRef,
    useCallback,
} from 'react'

function wrapArray<T>(array: T[], startIndex: number) {
    return array.map((_, index) => array[(startIndex + index) % array.length])
}

function focusFirst(candidates: HTMLElement[]) {
    const previousFocus = document.activeElement
    while (document.activeElement === previousFocus && candidates.length > 0) {
        candidates.shift()?.focus()
    }
}

type RovingTabindexItem = {
    value: string
    element: HTMLElement
}

const ToggleGroupContext = createContext<{
    value: string | null
    onChange: (value: string) => void
    registerNode: (id: string, element: HTMLElement) => void
    deregisterNode: (id: string) => void
    currentRovingTabindexValue: string | null
    onFocus: (id: string) => void
    onShiftTab: () => void
    getOrderedItems: () => RovingTabindexItem[]
}>({
    value: null,
    onChange: () => {},
    registerNode: () => {},
    deregisterNode: () => {},
    currentRovingTabindexValue: null,
    onFocus: () => {},
    onShiftTab: () => {},
    getOrderedItems: () => [],
})

type RootBaseProps = {
    children: ReactNode | ReactNode[]
    value: string | null
    onChange: (value: string) => void
}

type RootProps = RootBaseProps & Omit<ComponentPropsWithoutRef<'div'>, keyof RootBaseProps>

function Root({ value, onChange, children, ...props }: RootProps) {
    const [elements] = useState<Map<string, HTMLElement>>(new Map())
    const [isShiftTabbing, setIsShiftTabbing] = useState(false)
    const [currentRovingTabindexValue, setCurrentRovingTabindexValue] = useState<string | null>(
        null,
    )
    const rootRef = useRef<HTMLDivElement | null>(null)

    const getOrderedItems = useCallback(() => {
        if (!rootRef.current || !elements) return []
        const domElements = Array.from(
            rootRef.current.querySelectorAll('[data-roving-tabindex-item]'),
        )

        return Array.from(elements)
            .sort((a, b) => domElements.indexOf(a[1]) - domElements.indexOf(b[1]))
            .map(([value, element]) => ({ value, element }))
    }, [elements])

    const providerValue = useMemo(
        () => ({
            value,
            onChange,
            registerNode: function (id: string, element: HTMLElement) {
                elements.set(id, element)
            },
            deregisterNode: function (id: string) {
                elements.delete(id)
            },
            onFocus: function (id: string) {
                setCurrentRovingTabindexValue(id)
            },
            onShiftTab: function () {
                setIsShiftTabbing(true)
            },
            currentRovingTabindexValue,
            getOrderedItems,
        }),
        [currentRovingTabindexValue, elements, getOrderedItems, onChange, value],
    )

    return (
        <ToggleGroupContext.Provider value={providerValue}>
            <div
                role="group"
                tabIndex={isShiftTabbing ? -1 : 0}
                onFocus={e => {
                    if (isShiftTabbing) return
                    const orderedItems = getOrderedItems()
                    if (orderedItems.length === 0) return

                    const candidates = [
                        elements.get(currentRovingTabindexValue ?? ''),
                        elements.get(value ?? ''),
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
        </ToggleGroupContext.Provider>
    )
}

type ToggleGroupButtonBaseProps = {
    className?: string
    value: string
    children: ReactNode
}

type ToggleGroupButtonProps = ToggleGroupButtonBaseProps &
    Omit<ComponentPropsWithoutRef<'button'>, keyof ToggleGroupButtonBaseProps>

function Button({ children, value, className, ...props }: ToggleGroupButtonProps) {
    const {
        value: selectedValue,
        onChange,
        registerNode,
        deregisterNode,
        currentRovingTabindexValue,
        onShiftTab,
        getOrderedItems,
        onFocus,
    } = useContext(ToggleGroupContext)

    return (
        <button
            className={clsx(
                className,
                'bg-slate-200 p-1 first:rounded-l last:rounded-r hover:bg-slate-300 outline-none border-2 border-transparent focus:border-slate-400 transition-all',
                selectedValue === value && 'bg-slate-300',
            )}
            ref={(element: HTMLElement | null) => {
                element != null ? registerNode(value, element) : deregisterNode(value)
            }}
            role="radio"
            aria-checked={selectedValue === value}
            tabIndex={currentRovingTabindexValue === value ? 0 : -1}
            data-roving-tabindex-item
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                onChange(value)
                props.onClick?.(e)
            }}
            onMouseDown={(e: MouseEvent) => {
                onFocus(value)
            }}
            onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                if (isHotkey('space', e)) {
                    onChange(value)
                }

                if (isHotkey('shift+tab', e)) {
                    onShiftTab()
                    return
                }

                const orderedItems = getOrderedItems()
                if (orderedItems.length === 0) return

                if (isHotkey('down', e) || isHotkey('right', e)) {
                    const currIndex = orderedItems.findIndex(item => item.value === value)
                    const candidates = wrapArray(orderedItems, currIndex + 1).map(
                        item => item.element,
                    )
                    focusFirst(candidates)
                } else if (isHotkey('up', e) || isHotkey('left', e)) {
                    const currIndex = orderedItems.findIndex(item => item.value === value)
                    const candidates = wrapArray(orderedItems.reverse(), currIndex + 1).map(
                        item => item.element,
                    )
                    focusFirst(candidates)
                } else if (isHotkey('home', e)) {
                    focusFirst(orderedItems.map(item => item.element))
                } else if (isHotkey('end', e)) {
                    focusFirst(orderedItems.map(item => item.element).reverse())
                }

                props.onKeyDown?.(e)
            }}
            onFocus={(e: FocusEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                onFocus(value)
            }}
        >
            {children}
        </button>
    )
}
export const ToggleGroup = { Root, Button }
