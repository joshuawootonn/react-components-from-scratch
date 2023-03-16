import clsx from 'clsx'
import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react'

export type TreeViewState = Map<string, boolean>

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
            return new Map(state).set(action.id, true)

        case TreeViewActionTypes.CLOSE:
            return new Map(state).set(action.id, false)

        default:
            throw new Error('Tree Reducer received an unknown action')
    }
}

export type TreeViewContextType = {
    open: TreeViewState
    dispatch: Dispatch<TreeViewActions>
}

export const TreeViewContext = createContext<TreeViewContextType>({
    open: new Map<string, boolean>(),
    dispatch: () => {},
})

type RootProps = {
    children: ReactNode | ReactNode[]
    className?: string
}

export function Root({ children, className }: RootProps) {
    const [open, dispatch] = useReducer(treeviewReducer, new Map<string, boolean>())

    return (
        <TreeViewContext.Provider
            value={{
                open,
                dispatch,
            }}
        >
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
