import classNames from 'clsx'
import { motion } from 'framer-motion'

import { Folder, File, Arrow } from 'components/treeview/icons'
import { useTreeNode } from 'lib/treeview'

type TreeNodeProps = {
    id: string
    depth?: number
}

export const TreeNode = function TreeNode({ id }: TreeNodeProps) {
    const {
        isOpen,
        isFocusable,
        isSelected,
        getTreeNodeProps,
        treeGroupProps,
        metadata,
        children,
    } = useTreeNode(id)

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
                <motion.ul {...treeGroupProps} key={id + 'ul'} className="pl-2">
                    {children.map(childNodeId => {
                        return <TreeNode key={id + childNodeId} id={childNodeId} />
                    })}
                </motion.ul>
            )}
        </li>
    )
}
