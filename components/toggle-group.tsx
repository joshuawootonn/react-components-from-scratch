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
    ComponentPropsWithoutRef,
} from 'react'

import { RovingTabindexRoot, useRovingTabindex } from './roving-tabindex'

const ToggleGroupContext = createContext<{
    value: string | null
    onChange: (value: string) => void
    registerNode: (id: string, element: HTMLElement) => void
    deregisterNode: (id: string) => void
}>({
    value: null,
    onChange: () => {},
    registerNode: () => {},
    deregisterNode: () => {},
})

type ToggleGroupBaseProps = {
    children: ReactNode | ReactNode[]
    value: string | null
    onChange: (value: string) => void
}

type ToggleGroupProps = ToggleGroupBaseProps &
    Omit<ComponentPropsWithoutRef<'div'>, keyof ToggleGroupBaseProps>

export function ToggleGroup({ value, onChange, children, ...props }: ToggleGroupProps) {
    const [elements] = useState<Map<string, HTMLElement>>(new Map())

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
        }),
        [elements, onChange, value],
    )

    return (
        <ToggleGroupContext.Provider value={providerValue}>
            <RovingTabindexRoot role="group" active={value} elementsById={elements} {...props}>
                {children}
            </RovingTabindexRoot>
        </ToggleGroupContext.Provider>
    )
}

const useToggleContext = function (value: string) {
    const { currentRovingTabindexValue, ...rovingProps } = useRovingTabindex(value)
    const {
        value: currentValue,
        onChange,
        registerNode,
        deregisterNode,
    } = useContext(ToggleGroupContext)

    return useMemo(
        () => ({
            isSelected: currentValue === value,
            getToggleProps: (props: ComponentPropsWithoutRef<'button'>) => ({
                ref: (element: HTMLElement | null) => {
                    element != null ? registerNode(value, element) : deregisterNode(value)
                },
                role: 'radio',
                ['aria-checked']: currentValue === value,
                tabIndex: currentRovingTabindexValue === value ? 0 : -1,
                onClick: (e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation()
                    onChange(value)
                    props.onClick?.(e)
                },
                onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => {
                    e.stopPropagation()
                    if (isHotkey('space', e)) {
                        onChange(value)
                    }
                    rovingProps.onKeyDown(e)
                    props.onKeyDown?.(e)
                },
            }),
        }),
        [
            currentRovingTabindexValue,
            currentValue,
            deregisterNode,
            onChange,
            registerNode,
            rovingProps,
            value,
        ],
    )
}

type ToggleGroupButtonBaseProps = {
    className?: string
    value: string
    children: ReactNode
}

type ToggleGroupButtonProps = ToggleGroupButtonBaseProps &
    Omit<ComponentPropsWithoutRef<'button'>, keyof ToggleGroupButtonBaseProps>

export function ToggleGroupButton({
    children,
    value,
    className,
    ...props
}: ToggleGroupButtonProps) {
    const { isSelected, getToggleProps } = useToggleContext(value)

    return (
        <button
            {...getToggleProps({
                className: clsx(
                    className,
                    'bg-slate-200 p-1 first:rounded-l last:rounded-r hover:bg-slate-300 outline-none border-2 border-transparent focus:border-slate-400 transition-all',
                    isSelected && 'bg-slate-300',
                ),
                ...props,
            })}
        >
            {children}
        </button>
    )
}
