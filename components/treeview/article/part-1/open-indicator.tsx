import clsx from 'clsx'
import { motion } from 'framer-motion'
import { createContext, Dispatch, ReactNode, useContext, useMemo, useReducer } from 'react'

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

type IconProps = { open?: boolean; className?: string }

export function Arrow({ open, className }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={clsx('origin-center', open ? 'rotate-90' : 'rotate-0', className)}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    )
}

type NodeProps = {
    node: TreeNodeType
}

export const Node = function TreeNode({ node }: NodeProps) {
    const { open, dispatch } = useContext(TreeViewContext)
    const isOpen = open.get(node.id)
    return (
        <li className="flex flex-col cursor-pointer select-none">
            <div
                className={
                    'flex items-center space-x-2 font-mono font-medium rounded-sm px-1 text-ellipsis whitespace-nowrap overflow-hidden'
                }
                onClick={() => {
                    isOpen
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
                {node.children?.length ? (
                    <Arrow className="h-4 w-4" open={isOpen} />
                ) : (
                    <span className="h-4 w-4" />
                )}
                <span>{node.name}</span>
            </div>
            {node.children?.length && isOpen && (
                <ul className="pl-4">
                    {node.children.map(node => (
                        <Node node={node} key={node.id} />
                    ))}
                </ul>
            )}
        </li>
    )
}

export const TreeviewOpenIndicator = { Root, Node }
