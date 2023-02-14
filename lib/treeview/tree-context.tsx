import React, { Dispatch, MutableRefObject, ReactNode, useMemo, useReducer, useRef } from 'react'

import { RovingTabindexRoot } from 'components/roving-tabindex'
import { ChainableMap } from 'lib/utils/chainable-map'

import { TreeNodeType } from './initialValue'
import { getInitialTreeState } from './tree-initialization'
import { TreeActions, treeReducer, TreeState } from './tree-state'

export type TreeViewContextType = {
    state: TreeState
    dispatch: Dispatch<TreeActions>
    elements: MutableRefObject<ChainableMap<string, HTMLElement>>
}

export const TreeViewContext = React.createContext<TreeViewContextType>({
    state: getInitialTreeState([]),
    dispatch: () => {},
    elements: { current: new ChainableMap<string, HTMLElement>() },
})

type TreeViewProviderProps = {
    children: ReactNode | ReactNode[]
    value: TreeNodeType[]
    label: string
    className?: string
}

export function TreeviewProvider({ children, value, label, className }: TreeViewProviderProps) {
    const elements = useRef<ChainableMap<string, HTMLElement>>(new ChainableMap())
    const [state, dispatch] = useReducer(treeReducer, getInitialTreeState(value))

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
