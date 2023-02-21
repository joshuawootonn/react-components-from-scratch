import clsx from 'clsx'
import {
    createContext,
    Dispatch,
    MutableRefObject,
    ReactNode,
    useContext,
    useMemo,
    useReducer,
    MouseEvent,
} from 'react'

import { ChainableMap } from 'lib/utils'

export type TreeViewState = ChainableMap<string, boolean>

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

export function treeviewReducer(state: TreeViewState, action: TreeViewActions): TreeViewState {
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
    open: TreeViewState
    dispatch: Dispatch<TreeViewActions>
}

export const TreeViewContext = createContext<TreeViewContextType>({
    open: new ChainableMap<string, boolean>(),
    dispatch: () => {},
})

type RootProps = {
    children: ReactNode | ReactNode[]
    className?: string
}

export function Root({ children, className }: RootProps) {
    const [open, dispatch] = useReducer(treeviewReducer, new ChainableMap<string, boolean>())

    const providerValue = useMemo(
        () => ({
            open,
            dispatch,
        }),
        [open],
    )

    return (
        <TreeViewContext.Provider value={providerValue}>
            <ul className={clsx('flex flex-col overflow-auto', className)}>{children}</ul>
        </TreeViewContext.Provider>
    )
}

export type TreeNodeType = {
    id: string
    name: string
    children?: TreeNodeType[]
    icon?: ReactNode
}

type NodeProps = {
    node: TreeNodeType
}

export const Node = function TreeNode({ node }: NodeProps) {
    const { open, dispatch } = useContext(TreeViewContext)
    return (
        <li className="flex flex-col cursor-pointer select-none">
            <div
                className={
                    'font-mono font-medium rounded-sm px-1 text-ellipsis whitespace-nowrap overflow-hidden'
                }
                onClick={() => {
                    open.get(node.id)
                        ? dispatch({
                              id: node.id,
                              type: TreeViewActionTypes.CLOSE,
                          })
                        : dispatch({
                              id: node.id,
                              type: TreeViewActionTypes.OPEN,
                          })
                }}
            >
                {node.name}
            </div>
            {node.children?.length && open.get(node.id) && (
                <ul className="pl-4">
                    {node.children.map(node => (
                        <Node node={node} key={node.id} />
                    ))}
                </ul>
            )}
        </li>
    )
}
export const TreeviewOpen = { Root, Node }
