import React, { Dispatch, MutableRefObject } from 'react'

import { ChainableMap } from 'lib/utils'

export type Open = ChainableMap<string, boolean>

export enum TreeActionTypes {
    OPEN = 'OPEN',
    CLOSE = 'CLOSE',
}

export type TreeActions =
    | {
          type: TreeActionTypes.OPEN
          id: string
      }
    | {
          type: TreeActionTypes.CLOSE
          id: string
      }

export const TREE_ID = 'tree'

export function treeReducer(state: Open, action: TreeActions): Open {
    switch (action.type) {
        case TreeActionTypes.OPEN:
            return new ChainableMap(state).set(action.id, true)

        case TreeActionTypes.CLOSE:
            return new ChainableMap(state).set(action.id, false)

        default:
            console.log(action)

            throw new Error('Tree Reducer received an unknown action')
    }
}

export type TreeViewContextType = {
    open: Open
    dispatch: Dispatch<TreeActions>
    elements: MutableRefObject<ChainableMap<string, HTMLElement>>
    selectedId: string | null
    selectId: (id: string | null) => void
}

export const TreeViewContext = React.createContext<TreeViewContextType>({
    open: new ChainableMap<string, boolean>(),
    dispatch: () => {},
    elements: { current: new ChainableMap<string, HTMLElement>() },
    selectedId: null,
    selectId: () => {},
})
