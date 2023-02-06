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
    focusedId?: string | null
    selectedId?: string | null
    copiedId?: string | null
}

export enum TreeActionTypes {
    REGISTER = 'REGISTER',
    DEREGISTER = 'DEREGISTER',
    FOCUS = 'FOCUS',
    BLUR = 'BLUR',
    SELECT = 'SELECT',
    UNSELECT = 'UNSELECT',
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
    | { type: TreeActionTypes.FOCUS; id: string }
    | { type: TreeActionTypes.BLUR; id: string }
    | { type: TreeActionTypes.SELECT; id: string }
    | { type: TreeActionTypes.UNSELECT; id: string }
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
        case TreeActionTypes.FOCUS:
            return {
                ...state,
                focusedId: action.id,
            }

        case TreeActionTypes.BLUR:
            return {
                ...state,
                focusedId: state.focusedId === action.id ? null : state.focusedId,
            }

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

        case TreeActionTypes.UNSELECT:
            return {
                ...state,
                selectedId: null,
            }

        default:
            throw new Error('Tree Reducer received an unknown action')
    }
}
