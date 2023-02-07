import { ChainableMap } from 'lib/utils'

export type TreeNodeMetadata = {
    isFolder: boolean
    name: string
}

export type TreeState = {
    children: ChainableMap<string, string[]>
    isOpen: ChainableMap<string, boolean>
    metadata: ChainableMap<string, TreeNodeMetadata>
    focusableId?: string | null
    selectedId?: string | null
}

export enum TreeActionTypes {
    REGISTER = 'REGISTER',
    DEREGISTER = 'DEREGISTER',
    SELECT = 'SELECT',
    SET_FOCUSABLE = 'SET_FOCUSABLE',
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
    | { type: TreeActionTypes.SET_FOCUSABLE; id: string }
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
        case TreeActionTypes.SET_FOCUSABLE:
            return {
                ...state,
                focusableId: action.id,
            }

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
