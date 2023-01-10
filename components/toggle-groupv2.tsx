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

type FocusableItem = { value: string; element: HTMLElement }

const ToggleGroupContext = createContext<{
    value: string | null
    onChange: (value: string) => void
    registerNode: (id: string, element: HTMLElement) => void
    deregisterNode: (id: string) => void
    currentRovingTabindexValue: string | null
    onFocus: (id: string) => void
    onShiftTab: () => void
    getOrderedItems: () => FocusableItem[]
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
    const elements = useRef<Map<string, HTMLElement>>(new Map())
    const [isShiftTabbing, setIsShiftTabbing] = useState(false)
    const [currentRovingTabindexValue, setCurrentRovingTabindexValue] = useState<string | null>(
        null,
    )
    const ref = useRef<HTMLDivElement | null>(null)

    const getOrderedItems = useCallback(() => {
        if (!ref.current) return []

        const domElements = Array.from(ref.current.querySelectorAll('[data-roving-tabindex-item]'))

        return Array.from(elements.current)
            .sort((a, b) => domElements.indexOf(a[1]) - domElements.indexOf(b[1]))
            .map(([value, element]) => ({ value, element }))
    }, [elements])

    const providerValue = useMemo(
        () => ({
            value,
            onChange,
            registerNode: function (value: string, element: HTMLElement) {
                elements.current.set(value, element)
            },
            deregisterNode: function (value: string) {
                elements.current.delete(value)
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
        [currentRovingTabindexValue, getOrderedItems, onChange, value],
    )

    return (
        <ToggleGroupContext.Provider value={providerValue}>
            <div
                role="group"
                // tabIndex={isShiftTabbing ? -1 : 0}
                // onFocus={e => {
                //     if (isShiftTabbing) return
                //     const orderedItems = getOrderedItems()
                //     if (orderedItems.length === 0) return

                //     const candidates = [
                //         elements.current.get(currentRovingTabindexValue ?? ''),
                //         elements.current.get(value ?? ''),
                //         ...orderedItems.map(i => i.element),
                //     ].filter((element): element is HTMLElement => element != null)

                //     const previousFocus = document.activeElement
                //     while (document.activeElement === previousFocus && candidates.length > 0) {
                //         candidates.shift()?.focus()
                //     }
                // }}
                // onBlur={() => setIsShiftTabbing(false)}
                ref={ref}
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
        onFocus,
        getOrderedItems,
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
            // tabIndex={currentRovingTabindexValue === value ? 0 : -1}
            data-roving-tabindex-item
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                onChange(value)
                props.onClick?.(e)
            }}
            // onMouseDown={(e: MouseEvent) => {
            //     onFocus(value)
            // }}
            onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
                // if (isHotkey('shift+tab', e)) {
                //     e.stopPropagation()
                //     onShiftTab()
                // }
                const items = getOrderedItems()
                let nextItem: FocusableItem | undefined

                if (isHotkey(['down', 'right'], e)) {
                    const currIndex = items.findIndex(item => item.value === value)
                    if (currIndex === -1) nextItem = items.shift()
                    nextItem = currIndex === items.length - 1 ? items[0] : items[currIndex + 1]
                } else if (isHotkey(['up', 'left'], e)) {
                    const currIndex = items.findIndex(item => item.value === value)
                    if (currIndex === -1) nextItem = items.shift()
                    nextItem = currIndex === 0 ? items[items.length - 1] : items[currIndex - 1]
                } else if (isHotkey('home', e)) {
                    nextItem = items.shift()
                } else if (isHotkey('end', e)) {
                    nextItem = items.reverse().shift()
                }

                if (nextItem) {
                    nextItem.element.focus()
                    onChange(nextItem.value)
                }

                props.onKeyDown?.(e)
            }}
            // onFocus={(e: FocusEvent<HTMLButtonElement>) => {
            //     e.stopPropagation()
            //     onFocus(value)
            // }}
        >
            {children}
        </button>
    )
}
export const ToggleGroup = { Root, Button }
