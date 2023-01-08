import { ComponentPropsWithoutRef, createContext, ReactNode, useMemo, useState } from 'react'

import { RovingTabindexRoot } from './roving-tabindex'

const TabsContext = createContext<{ value?: string; setValue: (value: string) => void }>({
    value: undefined,
    setValue: () => {},
})

type TabsRootProps = {
    defaultValue: string
    children?: ReactNode | ReactNode[]
}

function TabsRoot({ defaultValue, children }: TabsRootProps) {?
    const [elements] = useState<Map<string, HTMLElement>>(new Map())
    const [value, onChange] = useState<string>(defaultValue)


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
        <TabsContext.Provider value={{ value, setValue }}>
            <RovingTabindexRoot active={value}>{children}</RovingTabindexRoot>
        </TabsContext.Provider>
    )
}

type TabsButtonBaseProps = {}

type TabsButtonsProps = TabsButtonBaseProps &
    Omit<ComponentPropsWithoutRef<'button'>, keyof TabsButtonBaseProps>

function TabButton(props: TabsButtonsProps) {

    
    return <button {...props}>{props.children}</button>
}

function TabContent() {
    return null
}
