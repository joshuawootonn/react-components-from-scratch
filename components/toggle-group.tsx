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
} from 'react'

const ToggleGroupContext = createContext<{
    selectedId: string | null
    select: Dispatch<SetStateAction<string | null>>
}>({
    selectedId: null,
    select: () => {},
})

type ToggleGroupProps = {
    children: ReactNode | ReactNode[]
}

export function ToggleGroup({ children }: ToggleGroupProps) {
    const [selectedId, select] = useState<string | null>(null)

    const value = useMemo(
        () => ({
            
            selectedId,
            select,
        }),
        [selectedId],
    )

    return (
        <ToggleGroupContext.Provider value={value}>
            <div>{children}</div>
        </ToggleGroupContext.Provider>
    )
}

type ToggleGroupButtonProps = {
    className?: string
    children: ReactNode
}

export function ToggleGroupButton({ children, className }: ToggleGroupButtonProps) {
    const { selectedId, select } = useContext(ToggleGroupContext)
    const id = useId()

    return (
        <button
            ref={ref}
            tabIndex={selectedId === id ? 0 : -1}
            onClick={() => {
                select(id)
            }}
            className={clsx(
                className,
                'bg-slate-200 p-1 first:rounded-l last:rounded-r hover:bg-slate-300',
                selectedId === id && 'bg-slate-300',
            )}
        >
            {children}
        </button>
    )
}
