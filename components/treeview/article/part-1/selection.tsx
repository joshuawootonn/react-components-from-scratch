import clsx from 'clsx'
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
    selectedId: string | null
    selectId: (id: string) => void
}

export const TreeViewContext = createContext<TreeViewContextType>({
    open: new ChainableMap<string, boolean>(),
    dispatch: () => {},
    selectedId: null,
    selectId: () => {},
})

type RootProps = {
    children: ReactNode | ReactNode[]
    className?: string
    value: string | null
    onChange: (id: string) => void
}

export function Root({ children, className, value, onChange }: RootProps) {
    const [open, dispatch] = useReducer(treeviewReducer, new ChainableMap<string, boolean>())

    const providerValue = useMemo(
        () => ({
            open,
            dispatch,
            selectedId: value,
            selectId: onChange,
        }),
        [onChange, open, value],
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
    const { open, dispatch, selectId, selectedId } = useContext(TreeViewContext)
    const isOpen = open.get(node.id)
    return (
        <li className="flex flex-col cursor-pointer select-none">
            <div
                className={clsx(
                    'flex items-center space-x-2 font-mono font-medium rounded-sm px-1 ',
                    selectedId === node.id ? 'bg-slate-200' : 'bg-transparent',
                )}
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
                    selectId(node.id)
                }}
            >
                {node.children?.length ? (
                    <Arrow className="h-4 w-4 shrink-0" open={isOpen} />
                ) : (
                    <span className="h-4 w-4" />
                )}
                <span className="text-ellipsis whitespace-nowrap overflow-hidden">{node.name}</span>
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

export const TreeviewSelection = { Root, Node }