import clsx from 'clsx'
import clamp from 'lodash.clamp'
import { PointerEvent as ReactPointerEvent, useRef, useState } from 'react'

import { Content } from 'components/sidebar/content'
import { TreeviewArrow } from 'components/treeview/article/part-3/animatedTreeview'
import { initialValue } from 'lib/treeview'

const Open = {
    Open: 'open',
    Closed: 'closed',
} as const

type Open = typeof Open[keyof typeof Open]

export default function GitlabSidebarPage() {
    const [selected, select] = useState<string | null>(null)
    const [width, setWidth] = useState(250)
    const originalWidth = useRef(width)
    const originalClientX = useRef(width)
    const [isDragging, setDragging] = useState(false)
    const [isOpen, setOpen] = useState<Open>(Open.Open)

    return (
        <div className="flex w-screen justify-start items-start">
            <nav
                className={clsx(
                    'fixed top-0 bottom-0 left-0 flex flex-col space-y-2 h-screen max-h-screen flex-shrink-0 bg-[rgb(251,251,250)] transition-transform ease-[cubic-bezier(0.165,0.84,0.44,1)] duration-300 ',
                    {
                        ['cursor-col-resize']: isDragging,
                    },
                    isDragging
                        ? 'shadow-[rgba(0,0,0,0.2)_-2px_0px_0px_0px_inset]'
                        : 'shadow-[rgba(0,0,0,0.04)_-2px_0px_0px_0px_inset]',
                    isOpen === Open.Open
                        ? 'translate-x-0'
                        : '-translate-x-full',
                )}
                aria-labelledby="nav-heading"
                style={{ width }}
            >
                <div className="flex flex-col space-y-2 p-3 h-full overflow-auto">
                    <h2 id="nav-heading" className="text-lg font-bold">
                        Lorem Ipsum
                    </h2>
                    <TreeviewArrow.Root
                        value={selected}
                        onChange={select}
                        className={'not-prose h-full'}
                        label="File Explorer"
                    >
                        {initialValue.map(node => (
                            <TreeviewArrow.Node node={node} key={node.id} />
                        ))}
                    </TreeviewArrow.Root>
                    <span className="text-base font-bold">Lorem Ipsum</span>
                </div>
                <button
                    className="absolute bg-white p-1 border-y-2 border-r-2 border-[rgba(0,0,0,0.08)] text-slate-600 -right-[34px]"
                    onClick={() =>
                        setOpen(isOpen =>
                            isOpen === Open.Closed ? Open.Open : Open.Closed,
                        )
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={clsx(
                            'w-6 h-6 transition-transform ease-[cubic-bezier(0.165,0.84,0.44,1)] duration-300',
                            isOpen === Open.Open ? 'rotate-180' : 'rotate-0',
                        )}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
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
                                if (e.clientX < 50) setOpen(Open.Closed)
                                else setOpen(Open.Open)

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
            </nav>

            <main
                style={{ paddingLeft: isOpen === Open.Open ? width : 0 }}
                className={clsx(
                    'flex flex-grow max-h-screen',
                    isDragging
                        ? 'transition-none'
                        : 'transition-all ease-[cubic-bezier(0.165,0.84,0.44,1)] duration-300',
                )}
            >
                <div className="flex flex-col px-5 py-12 flex-grow overflow-auto">
                    <div className="prose mx-auto">
                        <h1>Gitlab</h1>
                        <code>{`Sidebar state: ${isOpen}`}</code>
                        <Content />
                    </div>
                </div>
            </main>
        </div>
    )
}
