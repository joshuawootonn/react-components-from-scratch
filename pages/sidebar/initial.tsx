import clsx from 'clsx'
import { MotionConfig, motion } from 'framer-motion'
import clamp from 'lodash.clamp'
import { PointerEvent as ReactPointerEvent, useRef, useState } from 'react'

import { Content } from 'components/sidebar/content'
import { TreeviewArrow } from 'components/treeview/article/part-3/animatedTreeview'
import { initialValue } from 'lib/treeview'

const Open = {
    Locked: 'locked',
    Hidden: 'hidden',
} as const

type Open = typeof Open[keyof typeof Open]

export default function MakeswiftSidebarPage() {
    const [selected, select] = useState<string | null>(null)
    const [width, setWidth] = useState(250)
    const originalWidth = useRef(width)
    const originalClientX = useRef(width)
    const [isDragging, setDragging] = useState(false)
    const [isOpen, setOpen] = useState<Open>(Open.Locked)

    return (
        <MotionConfig
            transition={{ ease: [0.165, 0.84, 0.44, 1], duration: 0.3 }}
        >
            <div className="flex w-screen justify-start items-start">
                <motion.div
                    className={clsx(
                        'relative h-screen max-h-screen py-2 bg-[rgb(251,251,250)]',
                        {
                            ['cursor-col-resize']: isDragging,
                        },
                        isDragging
                            ? 'shadow-[rgba(0,0,0,0.2)_-2px_0px_0px_0px_inset]'
                            : 'shadow-[rgba(0,0,0,0.04)_-2px_0px_0px_0px_inset]',
                    )}
                    initial={false}
                    animate={{
                        width: isOpen === Open.Locked ? width : 0,
                    }}
                >
                    <motion.div
                        animate={isOpen}
                        variants={{
                            [Open.Locked]: {
                                opacity: 1,
                                transition: {
                                    duration: 0.15,
                                    delay: 0.2,
                                },
                            },
                            [Open.Hidden]: {
                                opacity: 0,
                                transition: {
                                    duration: 0.15,
                                },
                            },
                        }}
                    >
                        <div className="flex justify-between items-center p-2">
                            <div>Non scrolling header</div>
                        </div>

                        <div className="flex flex-col relative z-0 space-y-4">
                            <TreeviewArrow.Root
                                value={selected}
                                onChange={select}
                                className={clsx('not-prose')}
                                label="File Explorer"
                            >
                                {initialValue.map(node => (
                                    <TreeviewArrow.Node
                                        node={node}
                                        key={node.id}
                                    />
                                ))}
                            </TreeviewArrow.Root>
                        </div>
                    </motion.div>
                    <button
                        className="absolute bg-white p-1 border-y-2 border-r-2 border-[rgba(0,0,0,0.08)] top-3 -right-[34px]"
                        onClick={() =>
                            setOpen(isOpen =>
                                isOpen === Open.Hidden
                                    ? Open.Locked
                                    : Open.Hidden,
                            )
                        }
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
                                    if (e.clientX < 50) setOpen(Open.Hidden)
                                    else setOpen(Open.Locked)

                                    setWidth(
                                        Math.floor(
                                            clamp(
                                                originalWidth.current +
                                                    e.clientX -
                                                    originalClientX.current,
                                                200,
                                                400,
                                            ),
                                        ),
                                    )
                                }

                                function onPointerUp(e: PointerEvent) {
                                    ownerDocument.removeEventListener(
                                        'pointermove',
                                        onPointerMove,
                                    )
                                    setDragging(false)

                                    if (
                                        Math.abs(
                                            e.clientX - originalClientX.current,
                                        ) < 6
                                    ) {
                                        setOpen(value =>
                                            value !== Open.Locked
                                                ? Open.Locked
                                                : Open.Hidden,
                                        )
                                    }
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

                <div className="flex flex-grow max-h-screen">
                    <div className="w-10"></div>
                    <div className="flex flex-col py-12 flex-grow overflow-auto">
                        <div className="prose mx-auto">
                            <h1>{`Sidebar state ${isOpen}`}</h1>
                            <Content />
                        </div>
                    </div>
                </div>
            </div>
        </MotionConfig>
    )
}
