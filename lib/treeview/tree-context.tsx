import React, { Dispatch, MutableRefObject, ReactNode, useReducer, useRef } from 'react'

import { RovingTabindexRoot } from 'components/roving-tabindex'
import { ChainableMap } from 'lib/utils/ChainableMap'

import { TreeNodeType } from './initialValue'
import { getInitialTreeState } from './tree-initialization'
import { TreeActions, treeReducer, TreeState, TREE_ID } from './tree-state'

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
    children: ({
        dispatch,
        treeProps,
    }: {
        treeProps: {
            role: 'tree'
            ['aria-label']: string
            ['aria-multi-selectable']: 'false'
        }
        rootNodes: string[]
        dispatch: React.Dispatch<TreeActions>
        elements: MutableRefObject<ChainableMap<string, HTMLElement>>
        state: TreeState
    }) => ReactNode | ReactNode[]
    initialTree: TreeNodeType[]
    label: string
    className?: string
}

export function TreeViewProvider({
    children,
    initialTree,
    label,
    className,
}: TreeViewProviderProps) {
    const elements = useRef<ChainableMap<string, HTMLElement>>(new ChainableMap())
    const [state, dispatch] = useReducer(treeReducer, getInitialTreeState(initialTree))

    return (
        <TreeViewContext.Provider value={{ dispatch, elements, state }}>
            <RovingTabindexRoot
                active={state.selectedId ?? null}
                elementsById={elements.current}
                className={className}
            >
                {children({
                    treeProps: {
                        role: 'tree',
                        'aria-label': label,
                        'aria-multi-selectable': 'false',
                    },
                    rootNodes: state.children.get(TREE_ID) ?? [],
                    dispatch,
                    elements,
                    state,
                })}
            </RovingTabindexRoot>
        </TreeViewContext.Provider>
    )
}
