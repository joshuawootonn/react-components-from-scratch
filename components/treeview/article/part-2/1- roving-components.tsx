import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useRef,
    ComponentPropsWithoutRef,
    ElementType,
    MutableRefObject,
} from 'react'

export type RovingItem = {
    id: string
    element: HTMLElement
}

type RovingTabindexContextType = {
    getOrderedItems: () => RovingItem[]
    elements: MutableRefObject<Map<string, HTMLElement>>
}

const RovingTabindexContext = createContext<RovingTabindexContextType>({
    getOrderedItems: () => [],
    elements: { current: new Map<string, HTMLElement>() },
})

const NODE_SELECTOR = 'data-roving-tabindex-node'
const ROOT_SELECTOR = 'data-roving-tabindex-root'

type RovingTabindexRootBaseProps<T> = {
    children: ReactNode | ReactNode[]
    as?: T
}

type RovingTabindexRootProps<T extends ElementType> = RovingTabindexRootBaseProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof RovingTabindexRootBaseProps<T>>

export function RovingTabindexRoot<T extends ElementType>({
    children,
    as,
    ...props
}: RovingTabindexRootProps<T>) {
    const Component = as || 'div'
    const rootRef = useRef<HTMLDivElement | null>(null)
    const elements = useRef<Map<string, HTMLElement>>(new Map())

    const getOrderedItems = useCallback(() => {
        if (!rootRef.current || !elements.current) return []
        const domElements = Array.from(
            rootRef.current.querySelectorAll(`:where([${NODE_SELECTOR}=true])`),
        )

        return Array.from(elements.current)
            .sort((a, b) => domElements.indexOf(a[1]) - domElements.indexOf(b[1]))
            .map(([id, element]) => ({ id, element }))
    }, [])

    return (
        <RovingTabindexContext.Provider
            value={{
                getOrderedItems,
                elements,
            }}
        >
            <Component {...{ [ROOT_SELECTOR]: true }} ref={rootRef} {...props}>
                {children}
            </Component>
        </RovingTabindexContext.Provider>
    )
}

export function useRovingTabindex<T extends ElementType>(id: string) {
    const { getOrderedItems, elements } = useContext(RovingTabindexContext)

    return {
        getOrderedItems,
        getRovingProps: (props: ComponentPropsWithoutRef<T>) => ({
            ...props,
            ref: (element: HTMLElement | null) => {
                if (element) {
                    elements.current.set(id, element)
                } else {
                    elements.current.delete(id)
                }
            },
            [NODE_SELECTOR]: true,
        }),
    }
}
