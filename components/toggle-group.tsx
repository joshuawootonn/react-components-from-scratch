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
    KeyboardEvent,
    MouseEvent,
    useRef,
    useCallback,
} from 'react'

const ToggleGroupContext = createContext<{
    selectedId: string | null
    select: Dispatch<SetStateAction<string | null>>
    registerNode: (id: string, element: HTMLElement) => void
    deregisterNode: (id: string) => void
    elements: [string, HTMLElement][]
    getToggleItems: () => { id: string; element: HTMLElement }[]
}>({
    selectedId: null,
    select: () => {},
    registerNode: () => {},
    deregisterNode: () => {},
    elements: [],
    getToggleItems: () => [],
})

type ToggleGroupProps = {
    children: ReactNode | ReactNode[]
}

export function ToggleGroup({ children }: ToggleGroupProps) {
    const [selectedId, select] = useState<string | null>(null)
    const elements = useRef<Map<string, HTMLElement>>(new Map())
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    const getToggleItems = useCallback(() => {
        if (!wrapperRef.current || !elements.current) return []
        const domElements = Array.from(wrapperRef.current.querySelectorAll('[data-toggle-group]'))

        return Array.from(elements.current)
            .sort((a, b) => domElements.indexOf(a[1]) - domElements.indexOf(b[1]))
            .map(([id, element]) => ({ id, element }))
    }, [wrapperRef, elements])

    const value = useMemo(() => {
        let orderedItems: [string, HTMLElement][] = []

        return {
            elements: orderedItems,
            selectedId,
            select,
            registerNode: function (id: string, element: HTMLElement) {
                elements.current.set(id, element)
            },
            deregisterNode: function (id: string) {
                elements.current.delete(id)
            },
            getToggleItems,
        }
    }, [getToggleItems, selectedId])

    return (
        <ToggleGroupContext.Provider value={value}>
            <div ref={wrapperRef}>{children}</div>
        </ToggleGroupContext.Provider>
    )
}

const useToggleContext = function (id: string) {
    const { selectedId, select, registerNode, deregisterNode, getToggleItems } =
        useContext(ToggleGroupContext)

    return {
        ref: (element: HTMLElement | null) =>
            element != null ? registerNode(id, element) : deregisterNode(id),
        isSelected: selectedId === id,
        tabIndex: selectedId === id ? 0 : -1,
        onClick: (e: MouseEvent) => {
            select(id)
        },
        onKeyDown: (e: KeyboardEvent) => {
            const toggleItems = getToggleItems()
            if (toggleItems.length === 0) return
            console.log({ id })

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
    const id = useId()
    const { ref, isSelected, onClick, onKeyDown, tabIndex } = useToggleContext(id)

    return (
        <button
            data-toggle-group
            ref={ref}
            tabIndex={tabIndex}
            onKeyDown={onKeyDown}
            onClick={onClick}
            className={clsx(
                className,
                'bg-slate-200 p-1 first:rounded-l last:rounded-r hover:bg-slate-300',
                isSelected && 'bg-slate-300',
            )}
        >
            {children}
        </button>
    )
}
