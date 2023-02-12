import classNames from 'clsx'
import { memo, ReactNode } from 'react'

import { Folder, File, Arrow } from 'components/treeview/icons'
import { useTreeNode } from 'lib/treeview'
import { TreeNodeType, TreeviewProvider } from 'lib/treeview'

type NodeProps = {
    id: string
    children?: TreeNodeType[]
    depth?: number
}

export const Node = memo(function TreeNode({ id, children }: NodeProps) {
    const { isOpen, isFocusable, isSelected, getTreeNodeProps, treeGroupProps, metadata } =
        useTreeNode(id)

    return (
        <li
            {...getTreeNodeProps({
                className:
                    'relative cursor-pointer select-none flex flex-col focus:outline-none group',
            })}
        >
            <div
                className={classNames(
                    'group flex flex-row items-center border-[1.5px] border-transparent rounded-sm space-x-2',
                    isFocusable && 'group-focus:border-slate-400 focus-within:border-transparent',
                    isSelected ? 'bg-slate-200' : 'bg-transparent',
                )}
            >
                {metadata.isFolder ? (
                    <>
                        <Arrow className="h-4 w-4" isExpanded={isOpen} />
                        <Folder isExpanded={isOpen} className="h-5 w-5" />
                    </>
                ) : (
                    <>
                        <File className="ml-6 h-5 w-5" />
                    </>
                )}
                <span className="font-mono font-medium text-ellipsis whitespace-nowrap overflow-hidden flex-grow">
                    {metadata.name}
                </span>
            </div>
            {isOpen && children && (
                <ul {...treeGroupProps} className="pl-2">
                    {children.map(node => (
                        <Treeview.Node id={node.id} key={node.id}>
                            {node.children}
                        </Treeview.Node>
                    ))}
                </ul>
            )}
        </li>
    )
})

type RootProps = {
    value: TreeNodeType[]
    label: string
    className?: string
    children?: ReactNode | ReactNode[]
}

export const Root = function TreeRoot({ value, className, children, ...props }: RootProps) {
    return (
        <TreeviewProvider
            {...props}
            className={classNames(className, 'h-full overflow-auto')}
            value={value}
        >
            {children}
        </TreeviewProvider>
    )
}

export const Treeview = { Root, Node }
