import { ChainableMap } from 'lib/utils'
import { ReactNode } from 'react'

export type TreeNodeMetadata = {
    isFolder: boolean
    name: string
    icon: ReactNode | null
}

export type TreeState = {
    isOpen: ChainableMap<string, boolean>
    metadata: ChainableMap<string, TreeNodeMetadata>
    selectedId?: string | null
}

export enum TreeActionTypes {
    REGISTER = 'REGISTER',
    DEREGISTER = 'DEREGISTER',
    SELECT = 'SELECT',
    OPEN = 'OPEN',
    CLOSE = 'CLOSE',
}

export type TreeActions =
    | {
          type: TreeActionTypes.REGISTER
          id: string
          element: HTMLElement
      }
    | { type: TreeActionTypes.DEREGISTER; id: string }
    | { type: TreeActionTypes.SELECT; id: string }
    | {
          type: TreeActionTypes.OPEN
          id: string
      }
    | {
          type: TreeActionTypes.CLOSE
          id: string
      }

export const TREE_ID = 'tree'

export function treeReducer(state: TreeState, action: TreeActions): TreeState {
    switch (action.type) {
        case TreeActionTypes.OPEN:
            return {
                ...state,
                isOpen: new ChainableMap(state.isOpen).set(action.id, true),
            }

        case TreeActionTypes.CLOSE:
            return {
                ...state,
                isOpen: new ChainableMap(state.isOpen).set(action.id, false),
            }

        case TreeActionTypes.SELECT:
            return {
                ...state,
                selectedId: action.id,
            }

        default:
            throw new Error('Tree Reducer received an unknown action')
    }
}
