import classNames from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'

import { Folder, File, Arrow } from 'components/treeview/icons'
import { useTreeNode } from 'lib/treeview'

type TreeNodeProps = {
    id: string
    depth?: number
}

export function TreeNode({ id }: TreeNodeProps) {
    const {
        isOpen,
        isFocusable,
        isSelected,
        getTreeNodeProps,
        treeGroupProps,
        children,
        metadata,
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
                            transition: {
                                duration: 0.25,
                                ease: 'easeInOut',
                            },
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
                {isOpen && (
                    <motion.ul
                        {...treeGroupProps}
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
                                    ease: 'easeInOut',
                                },
                                opacity: {
                                    ease: 'easeInOut',
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
                                    ease: 'easeInOut',
                                },
                                opacity: {
                                    ease: 'easeInOut',
                                    duration: 0.2,
                                },
                            },
                        }}
                        className="pl-4"
                    >
                        {children?.map(childNodeId => {
                            return <TreeNode key={id + childNodeId} id={childNodeId} />
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </li>
    )
}
