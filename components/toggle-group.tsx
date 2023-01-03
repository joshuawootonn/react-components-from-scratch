import clsx from 'clsx'
import isHotkey from 'is-hotkey'
import {
    createContext,
    SetStateAction,
    Dispatch,
    ReactNode,
    useContext,
    useMemo,
    useState,
    useId,
    FocusEvent,
    KeyboardEvent,
    MouseEvent,
    useRef,
    useCallback,
} from 'react'

const ToggleGroupContext = createContext<{
    selectedId: string | null
    focusedId: string | null
    select: Dispatch<SetStateAction<string | null>>
    focus: Dispatch<SetStateAction<string | null>>
    onShiftTab: () => void
    registerNode: (id: string, element: HTMLElement) => void
    deregisterNode: (id: string) => void
    getToggleItems: () => { id: string; element: HTMLElement }[]
}>({
    selectedId: null,
    focusedId: null,
    select: () => {},
    focus: () => {},
    onShiftTab: () => {},
    registerNode: () => {},
    deregisterNode: () => {},
    getToggleItems: () => [],
})

type ToggleGroupProps = {
    children: ReactNode | ReactNode[]
}

export function ToggleGroup({ children }: ToggleGroupProps) {
    const [selectedId, select] = useState<string | null>(null)
    const [focusedId, focus] = useState<string | null>(null)
    const elements = useRef<Map<string, HTMLElement>>(new Map())
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const [isShiftTabbing, setIsShiftTabbing] = useState(false)

    const getToggleItems = useCallback(() => {
        if (!wrapperRef.current || !elements.current) return []
        const domElements = Array.from(wrapperRef.current.querySelectorAll('[data-toggle-group]'))

        return Array.from(elements.current)
            .sort((a, b) => domElements.indexOf(a[1]) - domElements.indexOf(b[1]))
            .map(([id, element]) => ({ id, element }))
    }, [wrapperRef, elements])

    const value = useMemo(
        () => ({
            focusedId,
            focus,
            selectedId,
            select,
            onShiftTab: function () {
                setIsShiftTabbing(true)
            },
            registerNode: function (id: string, element: HTMLElement) {
                console.log('register', id)
                elements.current.set(id, element)
            },
            deregisterNode: function (id: string) {
                console.log('deregister', id)

                elements.current.delete(id)
            },
            getToggleItems,
        }),
        [focusedId, getToggleItems, selectedId],
    )

    return (
        <ToggleGroupContext.Provider value={value}>
            <div
                tabIndex={isShiftTabbing ? -1 : 0}
                onFocus={e => {
                    if (isShiftTabbing) return
                    const toggleItems = getToggleItems()
                    if (toggleItems.length === 0) return

                    const focusIndex = toggleItems.findIndex(item => item.id === focusedId)

                    if (focusIndex !== -1) return toggleItems[focusIndex].element.focus()

                    const selectedIndex = toggleItems.findIndex(item => item.id === selectedId)

                    if (selectedIndex !== -1) return toggleItems[selectedIndex].element.focus()

                    return toggleItems[0].element.focus()
                }}
                onBlur={() => setIsShiftTabbing(false)}
                ref={wrapperRef}
            >
                {children}
            </div>
        </ToggleGroupContext.Provider>
    )
}

const useToggleContext = function () {
    const id = useId()
    const {
        selectedId,
        focusedId,
        select,
        focus,
        registerNode,
        onShiftTab,
        deregisterNode,
        getToggleItems,
    } = useContext(ToggleGroupContext)

    return {
        ref: (element: HTMLElement | null) =>
            element != null ? registerNode(id, element) : deregisterNode(id),
        isSelected: selectedId === id,
        tabIndex: focusedId === id ? 0 : -1,
        onClick: (e: MouseEvent) => {
            e.stopPropagation()
            select(id)
        },
        onFocus: (e: FocusEvent) => {
            e.stopPropagation()
            focus(id)
        },
        onKeyDown: (e: KeyboardEvent) => {
            e.stopPropagation()

            if (isHotkey('shift+tab', e)) {
                onShiftTab()
                return
            }

            const toggleItems = getToggleItems()
            if (toggleItems.length === 0) return

            if (isHotkey('down', e) || isHotkey('right', e)) {
                const currIndex = toggleItems.findIndex(item => item.id === id)
                const nextIndex = currIndex === toggleItems.length - 1 ? 0 : currIndex + 1
                toggleItems[nextIndex].element.focus()
            } else if (isHotkey('up', e) || isHotkey('left', e)) {
                const currIndex = toggleItems.findIndex(item => item.id === id)
                const prevIndex = currIndex === 0 ? toggleItems.length - 1 : currIndex - 1
                toggleItems[prevIndex].element.focus()
            } else if (isHotkey('home', e)) {
                toggleItems[0].element.focus()
            } else if (isHotkey('end', e)) {
                toggleItems[toggleItems.length - 1].element.focus()
            } else if (isHotkey('space', e)) {
                select(id)
            }
        },
        select,
    }
}

type ToggleGroupButtonProps = {
    className?: string
    children: ReactNode
}

export function ToggleGroupButton({ children, className }: ToggleGroupButtonProps) {
    const { ref, isSelected, onClick, onFocus, onKeyDown, tabIndex } = useToggleContext()

    return (
        <button
            data-toggle-group
            ref={ref}
            tabIndex={tabIndex}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            onClick={onClick}
            className={clsx(
                className,
                'bg-slate-200 p-1 first:rounded-l last:rounded-r hover:bg-slate-300 outline-none border-2 border-transparent focus:border-slate-400',
                isSelected && 'bg-slate-300',
            )}
        >
            {children}
        </button>
    )
}
