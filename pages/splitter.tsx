import clsx from 'clsx'
import { MotionConfig, motion } from 'framer-motion'
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
        <MotionConfig
            transition={{ ease: [0.165, 0.84, 0.44, 1], duration: 0.725 }}
        >
            <div className="flex w-screen">
                <motion.div
                    className={clsx(
                        'flex flex-col space-y-2 relative h-screen max-h-screen flex-shrink-0 py-2 transition-shadow divide-y-2',
                        {
                            ['cursor-col-resize']: isDragging,
                        },
                        isDragging
                            ? 'shadow-[rgba(0,0,0,0.2)_-apx_0px_0px_0px_inset]'
                            : 'shadow-[rgba(0,0,0,0.04)_-2px_0px_0px_0px_inset]',
                    )}
                    initial={false}
                    animate={{ width: isOpen ? width : 0 }}
                    transition={{ ease: 'easeOut' }}
                >
                    <motion.div
                        initial={false}
                        animate={{ x: isOpen ? 0 : -width }}
                        transition={{ ease: 'easeOut' }}
                        className="flex justify-between items-center p-2"
                    >
                        <div>Non scrolling header</div>
                    </motion.div>
                    <button
                        className="absolute bg-white p-1 border-r border-y -right-8"
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

                    <motion.div
                        className="max-h-96"
                        initial={false}
                        animate={{
                            x: isOpen ? 0 : -width,
                        }}
                        transition={{ ease: 'easeOut' }}
                    >
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

                <div className="flex my-24 w-full">
                    <div className="w-10"></div>
                    <div className="flex flex-col flex-grow">
                        <iframe
                            src="https://f0to19uu05.makeswift.site/eb6a1717-fb5a-4a31-b709-5b8d5c488c48?x-makeswift-preview-mode=3b6c3a4b-6b7a-4031-8242-655341752c20"
                            width="100%"
                            height="100%"
                            tabindex="-1"
                            title="The editor's rendered HTML document"
                            // style="display: block; border: 0px; margin: 0px auto; overflow: hidden; background: white; width: 100%; min-width: 769px; pointer-events: none;"
                            className="block overflow-hidden mx-auto bg-white w-full min-w-[769px] min-h-screen pointer-events-none"
                            // hidden=""
                        ></iframe>
                        <iframe
                            src="https://f0to19uu05.makeswift.site/48d9f3c4-d48e-4904-9267-9528ca9e2091?x-makeswift-preview-mode=3b6c3a4b-6b7a-4031-8242-655341752c20"
                            src="https://f0to19uu05.makeswift.site/48d9f3c4-d48e-4904-9267-9528ca9e2091?x-makeswift-preview-mode=3b6c3a4b-6b7a-4031-8242-655341752c20"
                            width="100%"
                            height="100%"
                            tabindex="-1"
                            title="The editor's rendered HTML document"
                            // style="display: block; border: 0px; margin: 0px auto; overflow: hidden; background: white; width: 100%; min-width: 769px; pointer-events: none;"
                            className="block overflow-hidden mx-auto bg-white w-full min-w-[769px] min-h-screen pointer-events-none"
                            // hidden=""
                        ></iframe>
                        <iframe
                            src="https://f0to19uu05.makeswift.site/48d9f3c4-d48e-4904-9267-9528ca9e2091?x-makeswift-preview-mode=3b6c3a4b-6b7a-4031-8242-655341752c20"
                            width="100%"
                            height="100%"
                            tabindex="-1"
                            title="The editor's rendered HTML document"
                            // style="display: block; border: 0px; margin: 0px auto; overflow: hidden; background: white; width: 100%; min-width: 769px; pointer-events: none;"
                            className="block overflow-hidden mx-auto bg-white w-full min-w-[769px] min-h-screen pointer-events-none"
                            // hidden=""
                        ></iframe>
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
        </MotionConfig>
    )
}
