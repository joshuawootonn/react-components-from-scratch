import clsx from 'clsx'
import { createContext, ReactNode, useContext, useMemo, ComponentPropsWithoutRef } from 'react'

const ToggleGroupContext = createContext<{
    value: string | null
    onChange: (value: string) => void
}>({
    value: null,
    onChange: () => {},
})

type RootBaseProps = {
    children: ReactNode | ReactNode[]
    value: string | null
    onChange: (value: string) => void
}

type RootProps = RootBaseProps & Omit<ComponentPropsWithoutRef<'div'>, keyof RootBaseProps>

function Root({ value, onChange, children, ...props }: RootProps) {
    const providerValue = useMemo(
        () => ({
            value,
            onChange,
        }),
        [onChange, value],
    )

    return (
        <ToggleGroupContext.Provider value={providerValue}>
            <div {...props}>{children}</div>
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
    const { value: selectedValue, onChange } = useContext(ToggleGroupContext)

    return (
        <button
            {...props}
            className={clsx(
                className,
                'bg-slate-200 p-1 first:rounded-l last:rounded-r hover:bg-slate-300 outline-none border-2 border-transparent focus:border-slate-400 transition-all',
                selectedValue === value && 'bg-slate-300',
            )}
            onClick={e => {
                onChange(value)
            }}
        >
            {children}
        </button>
    )
}

export const ToggleGroupStep1 = { Root, Button }
