import React, { ReactNode, useRef, useReducer, useEffect, useMemo, useCallback } from 'react'

import { RovingTabindexRoot } from 'components/roving-tabindex'
import { treeReducer, TreeViewContext } from 'lib/treeview'
import { ChainableMap } from 'lib/utils'

type TreeViewProviderProps = {
    children: ReactNode | ReactNode[]
    label: string
    className?: string
    value: string | null
    onChange: (id: string | null) => void
}

export function Root({ children, onChange, value, label, className }: TreeViewProviderProps) {
    const elements = useRef<ChainableMap<string, HTMLElement>>(new ChainableMap())
    const [open, dispatch] = useReducer(treeReducer, new ChainableMap<string, boolean>())

    const selectId = useCallback(
        (selectedId: string | null) => {
            onChange(selectedId)
        },
        [onChange],
    )

    const providerValue = useMemo(
        () => ({ dispatch, elements, open, selectId, selectedId: value }),
        [open, selectId, value],
    )

    return (
        <TreeViewContext.Provider value={providerValue}>
            <RovingTabindexRoot
                className={className}
                active={providerValue.selectedId ?? null}
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
