import clsx from 'clsx'
import React, { ReactNode, useReducer, useMemo, useCallback } from 'react'

import { RovingTabindexRoot } from 'components/roving-tabindex'
import { treeviewReducer, TreeViewContext } from 'lib/treeview'
import { ChainableMap } from 'lib/utils'

type RootProps = {
    children: ReactNode | ReactNode[]
    label: string
    className?: string
    value: string | null
    onChange: (id: string | null) => void
}

export function Root({ children, onChange, value, label, className }: RootProps) {
    const [open, dispatch] = useReducer(treeviewReducer, new ChainableMap<string, boolean>())

    const selectId = useCallback(
        (selectedId: string | null) => {
            onChange(selectedId)
        },
        [onChange],
    )

    const providerValue = useMemo(
        () => ({ dispatch, open, selectId, selectedId: value }),
        [open, selectId, value],
    )

    return (
        <TreeViewContext.Provider value={providerValue}>
            <RovingTabindexRoot
                className={clsx('flex flex-col overflow-auto', className)}
                active={providerValue.selectedId ?? null}
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
