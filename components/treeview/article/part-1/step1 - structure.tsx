import clsx from 'clsx'
import { ReactNode } from 'react'

type RootProps = {
    children: ReactNode | ReactNode[]
    className?: string
}

export function Root({ children, className }: RootProps) {
    return (
        <ul className={clsx('flex flex-col overflow-auto', className)}>
            {children}
        </ul>
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

export const Node = function TreeNode({ node: { name, children } }: NodeProps) {
    return (
        <li className="flex flex-col cursor-pointer select-none">
            <div
                className={
                    'font-mono font-medium rounded-sm px-1 text-ellipsis whitespace-nowrap overflow-hidden'
                }
            >
                {name}
            </div>
            {children?.length && (
                <ul className="pl-4">
                    {children.map(node => (
                        <Node node={node} key={node.id} />
                    ))}
                </ul>
            )}
        </li>
    )
}
export const TreeviewStructure = { Root, Node }
