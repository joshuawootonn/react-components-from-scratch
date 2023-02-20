import React, { ReactNode, useRef, useReducer, useEffect, useMemo } from 'react'

import { RovingTabindexRoot } from 'components/roving-tabindex'
import { getInitialTreeState, treeReducer, TreeViewContext } from 'lib/treeview'
import { ChainableMap } from 'lib/utils'

type TreeViewProviderProps = {
    children: ReactNode | ReactNode[]
    label: string
    className?: string
    onChange?: (id: string | null) => void
}

export function Root({ children, onChange, label, className }: TreeViewProviderProps) {
    const elements = useRef<ChainableMap<string, HTMLElement>>(new ChainableMap())
    const [state, dispatch] = useReducer(treeReducer, getInitialTreeState())

    useEffect(() => {
        onChange?.(state.selectedId ?? null)
    }, [onChange, state.selectedId])

    const providerValue = useMemo(() => ({ dispatch, elements, state }), [state])

    return (
        <TreeViewContext.Provider value={providerValue}>
            <RovingTabindexRoot
                className={className}
                active={state.selectedId ?? null}
                elementsById={elements.current}
                as="ul"
                aria-label={label}
                aria-multiselectable="false"
                role="tree"
            >
                {children}
            </RovingTabindexRoot>
        </TreeViewContext.Provider>
    )
}
