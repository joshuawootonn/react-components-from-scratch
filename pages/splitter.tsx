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
    const [isOpen, setOpen] = useState(false)

    return (
        <div className="flex">
            <motion.div
                className={clsx(
                    'h-screen max-h-screen overflow-y-auto flex-shrink-0 p-2',
                    {
                        ['cursor-col-resize']: isDragging,
                    },
                )}
                animate={{ width: isOpen ? width : 40 }}
                transition={{ ease: 'easeOut' }}
            >
                <button onClick={() => setOpen(isOpen => !isOpen)}>
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

                <motion.div
                    className="bg-gray-200"
                    initial={false}
                    animate={{
                        x: isOpen ? 0 : -width,
                    }}
                    transition={{ ease: 'easeOut' }}
                >
                    <TreeviewArrow.Root
                        value={selected}
                        onChange={select}
                        className={clsx('not-prose')}
                        label="File Explorer"
                    >
                        {longInitialValues.map(node => (
                            <TreeviewArrow.Node node={node} key={node.id} />
                        ))}
                    </TreeviewArrow.Root>
                </motion.div>
            </motion.div>

            <div
                onPointerDown={(e: ReactPointerEvent) => {
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

                    ownerDocument.addEventListener('pointermove', onPointerMove)
                    ownerDocument.addEventListener('pointerup', onPointerUp, {
                        once: true,
                    })
                }}
                className={clsx(
                    'w-2 cursor-col-resize shrink-0 shadow',
                    {
                        ['bg-gray-50']: isDragging,
                    },
                    isOpen ? 'w-2' : 'w-2',
                )}
            />
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
