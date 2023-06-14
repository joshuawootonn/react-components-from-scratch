import clsx from 'clsx'
import { MotionConfig, motion } from 'framer-motion'
import clamp from 'lodash.clamp'
import {
    PointerEvent,
    PointerEvent as ReactPointerEvent,
    useRef,
    useState,
} from 'react'

import { Content } from 'components/sidebar/content'
import { TreeviewArrow } from 'components/treeview/article/part-3/animatedTreeview'
import { longInitialValues } from 'lib/treeview'

const Open = {
    Locked: 'locked',
    Unlocked: 'unlocked',
    Hidden: 'hidden',
} as const

type Open = typeof Open[keyof typeof Open]

export default function NotionSidebarPage() {
    const [selected, select] = useState<string | null>(null)
    const [width, setWidth] = useState(250)
    const originalWidth = useRef(width)
    const originalClientX = useRef(width)
    const [isDragging, setDragging] = useState(false)
    const [isOpen, setOpen] = useState<Open>(Open.Locked)

    return (
        <MotionConfig
            transition={{ ease: [0.165, 0.84, 0.44, 1], duration: 0.35 }}
        >
            <div
                className="flex overflow-hidden"
                onPointerMove={(e: PointerEvent) => {
                    if (isDragging) return

                    if (e.clientX < 80) {
                        setOpen(isOpen =>
                            isOpen === Open.Hidden ? Open.Unlocked : isOpen,
                        )
                        return
                    }

                    let ele = e.target as Element | null
                    let called = false

                    while (ele != null && ele !== e.currentTarget) {
                        if (ele.getAttribute('data-show-unlocked-sidebar')) {
                            called = true
                            setOpen(isOpen =>
                                isOpen === Open.Hidden ? Open.Unlocked : isOpen,
                            )
                            break
                        }

                        ele = ele.parentElement
                    }

                    if (called === false)
                        setOpen(isOpen =>
                            isOpen === Open.Unlocked ? Open.Hidden : isOpen,
                        )
                }}
                onPointerLeave={(e: PointerEvent) => {
                    setOpen(isOpen =>
                        isOpen === Open.Unlocked ? Open.Hidden : isOpen,
                    )
                }}
            >
                <motion.div
                    className={clsx(
                        'flex flex-col relative h-screen max-h-screen flex-shrink-0',
                        {
                            ['cursor-col-resize']: isDragging,
                        },
                    )}
                    initial={false}
                    animate={{ width: isOpen === Open.Locked ? width : 0 }}
                    data-show-unlocked-sidebar
                >
                    <motion.div
                        className={clsx(
                            `p-3 absolute top-0 left-0 bottom-0 bg-[rgb(251,251,250)]`,
                            isOpen === Open.Locked
                                ? 'h-screen'
                                : `h-[calc(100vh-120px)]`,
                        )}
                        initial={false}
                        animate={{
                            boxShadow: `${
                                isDragging
                                    ? 'rgba(0,0,0,0.2)'
                                    : 'rgba(0,0,0,0.04)'
                            } -2px 0px 0px 0px inset, rgba(0,0,0,0.04) 0px ${
                                isOpen === Open.Locked ? '0' : '-2'
                            }px 0px 0px inset, rgba(0,0,0,0.04) 0px ${
                                isOpen === Open.Locked ? '0' : '2'
                            }px 0px 0px inset`,
                            borderTopRightRadius:
                                isOpen === Open.Locked ? '0px' : '3px',
                            borderBottomRightRadius:
                                isOpen === Open.Locked ? '0px' : '3px',
                            top: isOpen === Open.Locked ? 0 : 80,
                            width,
                            x: isOpen === Open.Hidden ? -width + 20 : 0,
                            opacity: isOpen === Open.Hidden ? 0 : 1,
                        }}
                    >
                        <div className="flex flex-col relative z-0 space-y-4">
                            <TreeviewArrow.Root
                                value={selected}
                                onChange={select}
                                className={clsx('h-full not-prose')}
                                label="File Explorer"
                            >
                                {longInitialValues.map(node => (
                                    <TreeviewArrow.Node
                                        node={node}
                                        key={node.id}
                                    />
                                ))}
                            </TreeviewArrow.Root>
                            <TreeviewArrow.Root
                                value={selected}
                                onChange={select}
                                className={clsx('h-full not-prose')}
                                label="File Explorer"
                            >
                                {longInitialValues.map(node => (
                                    <TreeviewArrow.Node
                                        node={node}
                                        key={node.id}
                                    />
                                ))}
                            </TreeviewArrow.Root>
                            <div className="absolute z-10 right-0 w-0 flex-grow-0 top-0 bottom-0">
                                <div
                                    onPointerDown={(e: ReactPointerEvent) => {
                                        // this prevents dragging from selecting
                                        e.preventDefault()

                                        const { ownerDocument } =
                                            e.currentTarget
                                        originalWidth.current = width
                                        originalClientX.current = e.clientX
                                        setDragging(true)

                                        function onPointerMove(
                                            e: globalThis.PointerEvent,
                                        ) {
                                            if (e.clientX < 50)
                                                setOpen(Open.Hidden)
                                            else setOpen(Open.Locked)

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

                                        function onPointerUp(
                                            e: globalThis.PointerEvent,
                                        ) {
                                            ownerDocument.removeEventListener(
                                                'pointermove',
                                                onPointerMove,
                                            )
                                            setDragging(false)

                                            if (
                                                Math.abs(
                                                    e.clientX -
                                                        originalClientX.current,
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
                        </div>
                    </motion.div>
                </motion.div>

                <div className="flex flex-col flex-grow max-h-screen">
                    <div className="flex flex-row w-full items-center space-x-3 p-3 shadow-[rgba(0,0,0,0.04)_0px_-2px_0px_0px_inset]">
                        <button
                            className="self-end"
                            onClick={() =>
                                setOpen(isOpen =>
                                    isOpen === Open.Unlocked
                                        ? Open.Locked
                                        : Open.Unlocked,
                                )
                            }
                            data-show-unlocked-sidebar
                        >
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                                initial={false}
                                animate={{
                                    rotate: isOpen === Open.Locked ? 180 : 0,
                                }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                />
                            </motion.svg>
                        </button>

                        <div className="translate-y-[1px]">
                            Non scrolling header
                        </div>
                    </div>
                    <div className="w-full py-12 mx-auto overflow-auto">
                        <div className="prose mx-auto overflow-hidden">
                            <h1>{`${isOpen}`}</h1>
                            <Content />
                        </div>
                    </div>
                </div>
            </div>
        </MotionConfig>
    )
}
