import { createContext, Dispatch, MutableRefObject } from 'react'

import { ChainableMap } from 'lib/utils'

export type OpenState = ChainableMap<string, boolean>

export enum TreeViewActionTypes {
    OPEN = 'OPEN',
    CLOSE = 'CLOSE',
}

export type TreeViewActions =
    | {
          type: TreeViewActionTypes.OPEN
          id: string
      }
    | {
          type: TreeViewActionTypes.CLOSE
          id: string
      }

export const TREE_VIEW_ROOT_ID = 'TREE_VIEW_ROOT_ID'

export function treeviewReducer(state: OpenState, action: TreeViewActions): OpenState {
    switch (action.type) {
        case TreeViewActionTypes.OPEN:
            return new ChainableMap(state).set(action.id, true)

        case TreeViewActionTypes.CLOSE:
            return new ChainableMap(state).set(action.id, false)

        default:
            throw new Error('Tree Reducer received an unknown action')
    }
}

export type TreeViewContextType = {
    open: OpenState
    dispatch: Dispatch<TreeViewActions>
    selectedId: string | null
    selectId: (id: string | null) => void
}

export const TreeViewContext = createContext<TreeViewContextType>({
    open: new ChainableMap<string, boolean>(),
    dispatch: () => {},
    selectedId: null,
    selectId: () => {},
})
