import clsx from 'clsx'
import isHotkey from 'is-hotkey'
import {
    createContext,
    ReactNode,
    useContext,
    useMemo,
    useState,
    ComponentPropsWithoutRef,
    useRef,
    useCallback,
} from 'react'

type Item = { value: string; element: HTMLElement }

const ToggleGroupContext = createContext<{
    value: string | null
    onChange: (value: string) => void
    register: (id: string, element: HTMLElement) => void
    deregister: (id: string) => void
    focusedValue: string | null
    setFocusedValue: (id: string) => void
    onShiftTab: () => void
    getOrderedItems: () => Item[]
}>({
    value: null,
    onChange: () => {},
    register: () => {},
    deregister: () => {},
    focusedValue: null,
    setFocusedValue: () => {},
    onShiftTab: () => {},
    getOrderedItems: () => [],
})

type RootBaseProps = {
    children: ReactNode | ReactNode[]
    value: string | null
    onChange: (value: string) => void
}

type PropsWithLabelBy = {
    ['aria-labelledby']: string
}

type PropsWithLabel = {
    ['aria-label']: string
}

type RootProps = (PropsWithLabel | PropsWithLabelBy) &
    RootBaseProps &
    Omit<ComponentPropsWithoutRef<'div'>, keyof RootBaseProps>

function Root({ value, onChange, children, ...props }: RootProps) {
    const elements = useRef<Map<string, HTMLElement>>(new Map())
    const [isShiftTabbing, setIsShiftTabbing] = useState(false)
    const [focusedValue, setFocusedValue] = useState<string | null>(value)
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
            register: function (value: string, element: HTMLElement) {
                elements.current.set(value, element)
            },
            deregister: function (value: string) {
                elements.current.delete(value)
            },
            setFocusedValue: function (id: string) {
                setFocusedValue(id)
            },
            onShiftTab: function () {
                setIsShiftTabbing(true)
            },
            focusedValue,
            getOrderedItems,
        }),
        [focusedValue, getOrderedItems, onChange, value],
    )

    return (
        <ToggleGroupContext.Provider value={providerValue}>
            <div
                role="radiogroup"
                tabIndex={isShiftTabbing ? -1 : 0}
                onFocus={e => {
                    props.onFocus?.(e)
                    if (e.target !== e.currentTarget) return
                    const orderedItems = getOrderedItems()

                    if (value) {
                        elements.current.get(value)?.focus()
                    } else {
                        orderedItems.at(0)?.element.focus()
                    }
                }}
                onBlur={e => {
                    props.onBlur?.(e)
                    setIsShiftTabbing(false)
                }}
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
        register,
        deregister,
        focusedValue,
        onShiftTab,
        setFocusedValue,
        getOrderedItems,
    } = useContext(ToggleGroupContext)

    return (
        <button
            {...props}
            className={clsx(
                className,
                'bg-slate-200 p-1 first:rounded-l last:rounded-r hover:bg-slate-300 outline-none border-2 border-transparent focus:border-slate-400 transition-all',
                selectedValue === value && 'bg-slate-300',
            )}
            ref={(element: HTMLElement | null) => {
                element != null ? register(value, element) : deregister(value)
            }}
            role="radio"
            aria-checked={selectedValue === value}
            tabIndex={focusedValue === value ? 0 : -1}
            data-roving-tabindex-item
            onClick={e => {
                props.onClick?.(e)
                e.currentTarget.focus()
                onChange(value)
            }}
            onKeyDown={e => {
                props.onKeyDown?.(e)
                if (isHotkey(['up', 'down'])) {
                    e.preventDefault()
                }
                if (isHotkey('shift+tab', e)) {
                    onShiftTab()
                }
                const items = getOrderedItems()
                let nextItem: Item | undefined
                const currIndex = items.findIndex(item => item.value === value)
                if (currIndex === -1) {
                    nextItem = items.shift()
                } else if (isHotkey(['down', 'right'], e)) {
                    nextItem = currIndex === items.length - 1 ? items[0] : items[currIndex + 1]
                } else if (isHotkey(['up', 'left'], e)) {
                    nextItem = currIndex === 0 ? items[items.length - 1] : items[currIndex - 1]
                }

                if (nextItem) {
                    nextItem.element.focus()
                    onChange(nextItem.value)
                }
            }}
            onFocus={e => {
                props.onFocus?.(e)
                setFocusedValue(value)
            }}
        >
            {children}
        </button>
    )
}

export const ToggleGroup = { Root, Button }
