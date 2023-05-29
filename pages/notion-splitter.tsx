import clsx from 'clsx'
import { motion } from 'framer-motion'
import clamp from 'lodash.clamp'
import { PointerEvent as ReactPointerEvent, useRef, useState } from 'react'

import { TreeviewArrow } from 'components/treeview/article/part-3/animatedTreeview'
import { longInitialValues, nextprojectInitialValues } from 'lib/treeview'

export default function SplitterPage() {
    const [selected, select] = useState<string | null>(null)
    const [width, setWidth] = useState(250)
    const originalWidth = useRef(width)
    const originalClientX = useRef(width)
    const [isDragging, setDragging] = useState(false)
    const [isOpen, setOpen] = useState(true)

    return (
        <div className="flex">
            <motion.div
                className={clsx(
                    'flex flex-col relative h-screen max-h-screen flex-shrink-0',
                    {
                        ['cursor-col-resize']: isDragging,
                    },
                )}
                initial={false}
                animate={{ width: isOpen ? width : 40 }}
                transition={{ ease: 'easeOut' }}
            >
                <motion.div
                    className={clsx(
                        'h-full w-full space-y-2 py-2 transition-shadow',
                        isDragging
                            ? 'shadow-[rgba(0,0,0,0.2)_-2px_0px_0px_0px_inset]'
                            : 'shadow-[rgba(0,0,0,0.04)_-2px_0px_0px_0px_inset]',
                    )}
                    initial={false}
                    animate={{
                        x: isOpen ? 0 : -width,
                    }}
                    transition={{ ease: 'easeOut' }}
                >
                    <motion.div
                        initial={false}
                        animate={{ x: isOpen ? 0 : -width + 40 }}
                        transition={{ ease: 'easeOut' }}
                        className="flex justify-between items-center p-2"
                    >
                        <div>Non scrolling header</div>

                        <button
                            className="self-end"
                            onClick={() => setOpen(isOpen => !isOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                        </button>
                    </motion.div>

                    <motion.div className="max-h-96">
                        <TreeviewArrow.Root
                            value={selected}
                            onChange={select}
                            className={clsx('h-full not-prose')}
                            label="File Explorer"
                        >
                            {longInitialValues.map(node => (
                                <TreeviewArrow.Node node={node} key={node.id} />
                            ))}
                        </TreeviewArrow.Root>
                    </motion.div>

                    <div className="absolute z-10 right-0 w-0 flex-grow-0 top-0 bottom-0">
                        <div
                            onPointerDown={(e: ReactPointerEvent) => {
                                // this prevents dragging from selecting
                                e.preventDefault()

                                const { ownerDocument } = e.currentTarget
                                originalWidth.current = width
                                originalClientX.current = e.clientX
                                setDragging(true)

                                function onPointerMove(e: PointerEvent) {
                                    setWidth(
                                        clamp(
                                            originalWidth.current +
                                                e.clientX -
                                                originalClientX.current,
                                            200,
                                            400,
                                        ),
                                    )
                                }

                                function onPointerUp() {
                                    ownerDocument.removeEventListener(
                                        'pointermove',
                                        onPointerMove,
                                    )
                                    setDragging(false)
                                }

                                ownerDocument.addEventListener(
                                    'pointermove',
                                    onPointerMove,
                                )
                                ownerDocument.addEventListener(
                                    'pointerup',
                                    onPointerUp,
                                    {
                                        once: true,
                                    },
                                )
                            }}
                            className={clsx(
                                'w-3 h-full cursor-col-resize shrink-0',
                            )}
                        />
                    </div>
                </motion.div>
            </motion.div>

            <div className="">
                <div>
                    <div>
                        <TreeviewArrow.Root
                            value={selected}
                            onChange={select}
                            className={clsx(
                                'not-prose border',
                                'relative border-transparent',
                                // isOpen
                                //     ? 'relative border-transparent'
                                //     : 'absolute border-gray-100',
                            )}
                            label="File Explorer"
                        >
                            {longInitialValues.map(node => (
                                <TreeviewArrow.Node node={node} key={node.id} />
                            ))}
                        </TreeviewArrow.Root>
                        <TreeviewArrow.Root
                            value={selected}
                            onChange={select}
                            className={clsx(
                                'not-prose border',
                                'relative border-transparent',
                                // isOpen
                                //     ? 'relative border-transparent'
                                //     : 'absolute border-gray-100',
                            )}
                            label="File Explorer"
                        >
                            {longInitialValues.map(node => (
                                <TreeviewArrow.Node node={node} key={node.id} />
                            ))}
                        </TreeviewArrow.Root>
                        <TreeviewArrow.Root
                            value={selected}
                            onChange={select}
                            className={clsx(
                                'not-prose border',
                                'relative border-transparent',
                                // isOpen
                                //     ? 'relative border-transparent'
                                //     : 'absolute border-gray-100',
                            )}
                            label="File Explorer"
                        >
                            {longInitialValues.map(node => (
                                <TreeviewArrow.Node node={node} key={node.id} />
                            ))}
                        </TreeviewArrow.Root>
                        <TreeviewArrow.Root
                            value={selected}
                            onChange={select}
                            className={clsx(
                                'not-prose border',
                                'relative border-transparent',
                                // isOpen
                                //     ? 'relative border-transparent'
                                //     : 'absolute border-gray-100',
                            )}
                            label="File Explorer"
                        >
                            {longInitialValues.map(node => (
                                <TreeviewArrow.Node node={node} key={node.id} />
                            ))}
                        </TreeviewArrow.Root>
                        <TreeviewArrow.Root
                            value={selected}
                            onChange={select}
                            className={clsx(
                                'not-prose border',
                                'relative border-transparent',
                                // isOpen
                                //     ? 'relative border-transparent'
                                //     : 'absolute border-gray-100',
                            )}
                            label="File Explorer"
                        >
                            {longInitialValues.map(node => (
                                <TreeviewArrow.Node node={node} key={node.id} />
                            ))}
                        </TreeviewArrow.Root>
                        <TreeviewArrow.Root
                            value={selected}
                            onChange={select}
                            className={clsx(
                                'not-prose border',
                                'relative border-transparent',
                                // isOpen
                                //     ? 'relative border-transparent'
                                //     : 'absolute border-gray-100',
                            )}
                            label="File Explorer"
                        >
                            {longInitialValues.map(node => (
                                <TreeviewArrow.Node node={node} key={node.id} />
                            ))}
                        </TreeviewArrow.Root>
                        <TreeviewArrow.Root
                            value={selected}
                            onChange={select}
                            className={clsx(
                                'not-prose border',
                                'relative border-transparent',
                                // isOpen
                                //     ? 'relative border-transparent'
                                //     : 'absolute border-gray-100',
                            )}
                            label="File Explorer"
                        >
                            {longInitialValues.map(node => (
                                <TreeviewArrow.Node node={node} key={node.id} />
                            ))}
                        </TreeviewArrow.Root>
                        <TreeviewArrow.Root
                            value={selected}
                            onChange={select}
                            className={clsx(
                                'not-prose border',
                                'relative border-transparent',
                                // isOpen
                                //     ? 'relative border-transparent'
                                //     : 'absolute border-gray-100',
                            )}
                            label="File Explorer"
                        >
                            {longInitialValues.map(node => (
                                <TreeviewArrow.Node node={node} key={node.id} />
                            ))}
                        </TreeviewArrow.Root>
                        <TreeviewArrow.Root
                            value={selected}
                            onChange={select}
                            className={clsx(
                                'not-prose border',
                                'relative border-transparent',
                                // isOpen
                                //     ? 'relative border-transparent'
                                //     : 'absolute border-gray-100',
                            )}
                            label="File Explorer"
                        >
                            {longInitialValues.map(node => (
                                <TreeviewArrow.Node node={node} key={node.id} />
                            ))}
                        </TreeviewArrow.Root>
                    </div>
                </div>
            </div>
        </div>
    )
}
