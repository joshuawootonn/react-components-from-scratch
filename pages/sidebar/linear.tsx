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
import { initialValue } from 'lib/treeview'

const Open = {
    Open: 'open',
    Closed: 'closed',
} as const

type Open = typeof Open[keyof typeof Open]

const Locked = {
    Locked: 'locked',
    Unlocked: 'unlocked',
} as const

type Locked = typeof Locked[keyof typeof Locked]

export default function LinearSidebarPage() {
    const [selected, select] = useState<string | null>(null)
    const [width, setWidth] = useState(250)
    const originalWidth = useRef(width)
    const originalClientX = useRef(width)
    const [isDragging, setDragging] = useState(false)
    const [locked, setLocked] = useState<Locked>(Locked.Locked)
    const [open, setOpen] = useState<Open>(Open.Open)

    return (
        <div
            className="flex"
            onPointerMove={(e: PointerEvent) => {
                if (isDragging) return

                if (e.clientX < 80) {
                    setOpen(Open.Open)
                    return
                }

                let ele = e.target as Element | null
                let called = false

                while (ele != null && ele !== e.currentTarget) {
                    if (ele.getAttribute('data-show-unlocked-sidebar')) {
                        called = true
                        setOpen(Open.Open)
                        break
                    }

                    ele = ele.parentElement
                }

                if (called === false)
                    setOpen(open =>
                        locked === Locked.Unlocked ? Open.Closed : open,
                    )
            }}
            onPointerLeave={(e: PointerEvent) => {
                setOpen(open =>
                    locked === Locked.Unlocked ? Open.Closed : open,
                )
            }}
        >
            <MotionConfig
                transition={{ ease: [0.165, 0.84, 0.44, 1], duration: 0.3 }}
            >
                <motion.div
                    initial={false}
                    animate={{
                        width:
                            locked === Locked.Locked && open === Open.Open
                                ? width
                                : 0,
                    }}
                    transition={{
                        ease: [0.165, 0.84, 0.44, 1],
                        duration: isDragging ? 0 : 0.3,
                    }}
                />
                <motion.nav
                    data-show-unlocked-sidebar
                    className={
                        'fixed top-0 left-0 bottom-0 bg-[rgb(251,251,250)]'
                    }
                    initial={false}
                    animate={{
                        boxShadow: `${
                            isDragging ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.04)'
                        } -2px 0px 0px 0px inset, rgba(0,0,0,0.04) 0px ${
                            locked === Locked.Locked ? '0' : '-2'
                        }px 0px 0px inset, rgba(0,0,0,0.04) 0px ${
                            locked === Locked.Locked ? '0' : '2'
                        }px 0px 0px inset, rgba(0,0,0,0.04) ${
                            locked === Locked.Locked ? '0' : '2'
                        }px 0px 0px 0px inset`,
                        borderRadius: locked === Locked.Locked ? '0px' : '5px',
                        top: locked === Locked.Locked ? 0 : 53,
                        width,
                        left:
                            open === Open.Open
                                ? locked === Locked.Locked
                                    ? 0
                                    : 5
                                : -width - 10,
                        bottom: locked === Locked.Locked ? 0 : 5,
                        transition: {
                            ease: [0.165, 0.84, 0.44, 1],
                            width: {
                                ease: [0.165, 0.84, 0.44, 1],
                                duration: isDragging ? 0 : 0.3,
                            },
                            left: {
                                ease: [0.165, 0.84, 0.44, 1],
                                duration: isDragging ? 0 : 0.3,
                            },
                        },
                    }}
                >
                    <div className="flex flex-col space-y-2 p-3 h-full overflow-auto">
                        <h2 id="nav-heading" className="text-lg font-bold">
                            Lorem Ipsum
                        </h2>
                        <TreeviewArrow.Root
                            value={selected}
                            onChange={select}
                            className={clsx('h-full not-prose')}
                            label="File Explorer"
                        >
                            {initialValue.map(node => (
                                <TreeviewArrow.Node node={node} key={node.id} />
                            ))}
                        </TreeviewArrow.Root>

                        <span className="text-base font-bold">Lorem Ipsum</span>

                        <div className="absolute z-10 right-0 w-0 flex-grow-0 top-0 bottom-0">
                            <div
                                onPointerDown={(e: ReactPointerEvent) => {
                                    // this prevents dragging from selecting
                                    e.preventDefault()

                                    const { ownerDocument } = e.currentTarget
                                    originalWidth.current = width
                                    originalClientX.current = e.clientX
                                    setDragging(true)

                                    function onPointerMove(
                                        e: globalThis.PointerEvent,
                                    ) {
                                        if (e.clientX < 50) {
                                            setOpen(Open.Closed)
                                        } else {
                                            setOpen(Open.Open)
                                        }

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
                                            setLocked(isLocked => {
                                                if (
                                                    isLocked === Locked.Locked
                                                ) {
                                                    setOpen(Open.Closed)
                                                    return Locked.Unlocked
                                                } else {
                                                    setOpen(Open.Open)
                                                    return Locked.Locked
                                                }
                                            })
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
                </motion.nav>

                <div className="flex flex-col flex-grow max-h-screen">
                    <header className="flex flex-row w-full items-center space-x-3 p-3 shadow-[rgba(0,0,0,0.04)_0px_-2px_0px_0px_inset]">
                        <motion.button
                            className="self-end"
                            onClick={() =>
                                setLocked(isLocked => {
                                    if (isLocked === Locked.Locked) {
                                        setOpen(Open.Closed)
                                        return Locked.Unlocked
                                    } else {
                                        setOpen(Open.Open)
                                        return Locked.Locked
                                    }
                                })
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
                                    rotate:
                                        locked === Locked.Locked &&
                                        open === Open.Open
                                            ? 180
                                            : 0,
                                }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                />
                            </motion.svg>
                        </motion.button>

                        <div className="translate-y-[1px]">Lorem Ipsum</div>
                    </header>
                    <main className="w-full py-12 mx-auto overflow-auto">
                        <div className="prose mx-auto">
                            <h1>Linear</h1>
                            <code>{`Sidebar state: ${open} and ${locked}`}</code>
                            <Content />
                        </div>
                    </main>
                </div>
            </MotionConfig>
        </div>
    )
}
