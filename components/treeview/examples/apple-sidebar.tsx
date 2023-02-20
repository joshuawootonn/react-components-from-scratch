import classNames from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import NextImage from 'next/image'
import { memo } from 'react'

import { Arrow } from 'components/treeview/icons'
import { useTreeNode } from 'lib/treeview'
import { TreeNodeType } from 'lib/treeview'

import { Root } from '../root'

type NodeProps = {
    depth?: number
    node: TreeNodeType
}

export const Node = memo(function TreeNode({ node, depth }: NodeProps) {
    const { isOpen, isFocusable, isSelected, getTreeNodeProps, treeGroupProps } = useTreeNode(
        node.id,
        { selectionType: 'followFocus', isFolder: Boolean(node.children) },
    )

    return (
        <>
            <li
                {...getTreeNodeProps({
                    className:
                        'relative cursor-pointer select-none flex flex-col focus:outline-none group  transition-[background-color] duration-[300ms] ease-in-out rounded-[7px]',
                })}
            >
                <div
                    className={classNames(
                        'text-[#E0E0E0] group flex flex-row items-center justify-start border-[1.5px] border-transparent rounded-[7px] space-x-1 h-6 ',
                        isFocusable &&
                            'group-focus-visible:bg-[#3478F7] focus-within:border-transparent',
                        isSelected ? 'bg-[#3478F7] ' : 'bg-transparent',
                    )}
                    style={{
                        paddingLeft: `${depth ? depth * 16 + 4 : 4}px`,
                    }}
                >
                    {Boolean(node.children) ? (
                        <>
                            <Arrow
                                className={classNames(
                                    'h-3.5 w-3.5 ',
                                    isSelected ? 'text-white' : 'text-[#A7A7A7]',
                                )}
                                isExpanded={isOpen}
                            />
                            <NextImage
                                alt="Folder icon"
                                src="/folder.png"
                                height={796}
                                width={963}
                                className="w-4"
                            />
                        </>
                    ) : (
                        <>
                            <NextImage
                                alt="File icon"
                                height={735}
                                width={959}
                                src="/file.png"
                                className="ml-5 w-3"
                            />
                        </>
                    )}

                    <span className="font-['Source_Sans_Pro'] font-medium leading-none text-ellipsis whitespace-nowrap overflow-hidden flex-grow">
                        {node.name}
                    </span>
                </div>
            </li>
            <AnimatePresence initial={false}>
                {isOpen && node.children && (
                    <motion.ul
                        key={node.id + 'ul'}
                        initial={{
                            height: 0,
                        }}
                        animate={{
                            height: 'auto',
                            transition: {
                                height: {
                                    duration: 0.25,
                                    ease: 'easeInOut',
                                },
                            },
                        }}
                        exit={{
                            height: 0,
                            transition: {
                                height: {
                                    duration: 0.25,
                                    ease: 'easeInOut',
                                },
                            },
                        }}
                        transition={{ duration: 1 }}
                        {...treeGroupProps}
                        className="flex flex-col justify-end overflow-hidden"
                    >
                        {node.children.map(node => (
                            <Node node={node} key={node.id} depth={(depth ?? 0) + 1} />
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </>
    )
})

export const AppleTreeview = { Root, Node }
