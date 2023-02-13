import classNames from 'clsx'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
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
            <MotionConfig
                transition={{
                    ease: [0.164, 0.84, 0.43, 1],
                    duration: 0.25,
                }}
            >
                <div
                    className={classNames(
                        'group flex flex-row items-center border-[1.5px] border-transparent rounded-sm space-x-2',
                        isFocusable &&
                            'group-focus:border-slate-400 focus-within:border-transparent',
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
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.svg
                            viewBox="0 0 3 60"
                            fill="none"
                            preserveAspectRatio="none"
                            width={2}
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute top-[30px] h-[calc(100%-36px)] bottom-0 left-2.5 transform -translate-x-1/2 stroke-slate-200 z-[-1]"
                            key={id + 'line'}
                            stroke="currentColor"
                            exit={{
                                height: 0,
                            }}
                        >
                            <motion.line
                                strokeLinecap="round"
                                x1="1"
                                x2="1"
                                y1="1"
                                y2="59"
                                strokeWidth={2}
                            />
                        </motion.svg>
                    )}
                </AnimatePresence>
                <AnimatePresence initial={false}>
                    {children && isOpen && (
                        <motion.ul
                            key={id + 'ul'}
                            initial={{
                                height: 0,
                                opacity: 0,
                            }}
                            animate={{
                                height: 'auto',
                                opacity: 1,
                                transition: {
                                    height: {
                                        duration: 0.25,
                                    },
                                    opacity: {
                                        duration: 0.2,
                                        delay: 0.05,
                                    },
                                },
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                                transition: {
                                    height: {
                                        duration: 0.25,
                                    },
                                    opacity: {
                                        duration: 0.2,
                                    },
                                },
                            }}
                            {...treeGroupProps}
                            className={classNames('pl-4')}
                        >
                            {children.map(node => (
                                <Treeview.Node id={node.id} key={node.id}>
                                    {node.children}
                                </Treeview.Node>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </MotionConfig>
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
