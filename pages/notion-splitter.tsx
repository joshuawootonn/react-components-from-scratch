import clsx from 'clsx'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import clamp from 'lodash.clamp'
import {
    MouseEvent,
    PointerEvent,
    PointerEvent as ReactPointerEvent,
    useRef,
    useState,
} from 'react'

import { TreeviewArrow } from 'components/treeview/article/part-3/animatedTreeview'
import { longInitialValues, nextprojectInitialValues } from 'lib/treeview'

export default function NotionSidebarPage() {
    const [selected, select] = useState<string | null>(null)
    const [width, setWidth] = useState(250)
    const originalWidth = useRef(width)
    const originalClientX = useRef(width)
    const [isDragging, setDragging] = useState(false)
    const [isOpen, setOpen] = useState<'locked' | 'unlocked' | 'hidden'>(
        'hidden',
    )

    return (
        <div
            className="flex"
            onPointerMove={(e: PointerEvent) => {
                if (isDragging) return

                if (e.clientX < 80) {
                    console.log('changed because of clientX')

                    setOpen(isOpen =>
                        isOpen === 'hidden' ? 'unlocked' : isOpen,
                    )
                    return
                }

                let ele = e.target as Element | null
                let called = false

                while (ele != null && ele !== e.currentTarget) {
                    if (ele.getAttribute('data-deez')) {
                        called = true
                        setOpen(isOpen =>
                            isOpen === 'hidden' ? 'unlocked' : isOpen,
                        )
                        break
                    }

                    ele = ele.parentElement
                }

                if (called === false)
                    setOpen(isOpen =>
                        isOpen === 'unlocked' ? 'hidden' : isOpen,
                    )
            }}
            onPointerLeave={(e: PointerEvent) => {
                setOpen(isOpen => (isOpen === 'unlocked' ? 'hidden' : isOpen))
            }}
        >
            <MotionConfig
                transition={{ ease: [0.165, 0.84, 0.44, 1], duration: 0.725 }}
            >
                <motion.div
                    className={clsx(
                        'flex flex-col relative h-screen max-h-screen flex-shrink-0',
                        {
                            ['cursor-col-resize']: isDragging,
                        },
                    )}
                    initial={false}
                    animate={{ width: isOpen === 'locked' ? width : 0 }}
                    data-deez
                >
                    <motion.div
                        className={clsx(
                            `p-3 absolute top-0 left-0 bottom-0 bg-[rgb(251,251,250)]`,
                            isOpen === 'locked'
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
                                isOpen === 'locked' ? '0' : '-2'
                            }px 0px 0px inset, rgba(0,0,0,0.04) 0px ${
                                isOpen === 'locked' ? '0' : '2'
                            }px 0px 0px inset`,
                            borderTopRightRadius:
                                isOpen === 'locked' ? '0px' : '3px',
                            borderBottomRightRadius:
                                isOpen === 'locked' ? '0px' : '3px',
                            top: isOpen === 'locked' ? 0 : 80,
                            width,
                            x: isOpen === 'hidden' ? -width + 20 : 0,
                            opacity: isOpen === 'hidden' ? 0 : 1,
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
                                            e: PointerEvent,
                                        ) {
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
                        </div>
                    </motion.div>
                </motion.div>

                <div className="flex flex-col flex-grow max-h-screen">
                    <div className="flex flex-row w-full items-center space-x-3 p-3 shadow-[rgba(0,0,0,0.04)_0px_-2px_0px_0px_inset]">
                        <motion.button
                            className="self-end"
                            onClick={() =>
                                setOpen(isOpen =>
                                    isOpen === 'unlocked'
                                        ? 'locked'
                                        : 'unlocked',
                                )
                            }
                            data-deez
                        >
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                                animate={{
                                    rotate: isOpen === 'locked' ? 180 : 0,
                                }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                />
                            </motion.svg>
                        </motion.button>

                        <div className="translate-y-[1px]">
                            Non scrolling header
                        </div>
                    </div>
                    <div className="w-full py-12 mx-auto overflow-auto">
                        <div className="prose mx-auto">
                            <h1>{`${isOpen}`}</h1>
                            <Content />
                        </div>
                    </div>
                </div>
            </MotionConfig>
        </div>
    )
}

function Content() {
    return (
        <>
            <p>
                <strong>Pellentesque habitant morbi tristique</strong> senectus
                et netus et malesuada fames ac turpis egestas. Vestibulum tortor
                quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
                Donec eu libero sit amet quam egestas semper.{' '}
                <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend
                leo. Quisque sit amet est et sapien ullamcorper pharetra.
                Vestibulum erat wisi, condimentum sed,{' '}
                <code>commodo vitae</code>, ornare sit amet, wisi. Aenean
                fermentum, elit eget tincidunt condimentum, eros ipsum rutrum
                orci, sagittis tempus lacus enim ac dui.{' '}
                <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut
                felis.
            </p>

            <h2>Header Level 2</h2>

            <ol>
                <li>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                </li>
                <li>Aliquam tincidunt mauris eu risus.</li>
            </ol>

            <blockquote>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus magna. Cras in mi at felis aliquet congue. Ut a est
                    eget ligula molestie gravida. Curabitur massa. Donec
                    eleifend, libero at sagittis mollis, tellus est malesuada
                    tellus, at luctus turpis elit sit amet quam. Vivamus pretium
                    ornare est.
                </p>
            </blockquote>

            <h3>Header Level 3</h3>

            <ul>
                <li>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                </li>
                <li>Aliquam tincidunt mauris eu risus.</li>
            </ul>

            <pre>
                <code>
                    {`#header h1 a {
display: block;
width: 300px;
height: 80px;
}`}
                </code>
            </pre>
            <h2>Header Level 2</h2>

            <ol>
                <li>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                </li>
                <li>Aliquam tincidunt mauris eu risus.</li>
            </ol>

            <blockquote>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus magna. Cras in mi at felis aliquet congue. Ut a est
                    eget ligula molestie gravida. Curabitur massa. Donec
                    eleifend, libero at sagittis mollis, tellus est malesuada
                    tellus, at luctus turpis elit sit amet quam. Vivamus pretium
                    ornare est.
                </p>
            </blockquote>

            <h3>Header Level 3</h3>

            <ul>
                <li>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                </li>
                <li>Aliquam tincidunt mauris eu risus.</li>
            </ul>

            <pre>
                <code>
                    {`#header h1 a {
display: block;
width: 300px;
height: 80px;
}`}
                </code>
            </pre>
        </>
    )
}
