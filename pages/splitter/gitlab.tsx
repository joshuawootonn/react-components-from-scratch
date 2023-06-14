import clsx from 'clsx'
import clamp from 'lodash.clamp'
import { PointerEvent as ReactPointerEvent, useRef, useState } from 'react'

import { Content } from 'components/sidebar/content'
import { TreeviewArrow } from 'components/treeview/article/part-3/animatedTreeview'
import { longInitialValues } from 'lib/treeview'

const Open = {
    Locked: 'locked',
    Hidden: 'hidden',
} as const

type Open = typeof Open[keyof typeof Open]

export default function GitlabSidebarPage() {
    const [selected, select] = useState<string | null>(null)
    const [width, setWidth] = useState(250)
    const originalWidth = useRef(width)
    const originalClientX = useRef(width)
    const [isDragging, setDragging] = useState(false)
    const [isOpen, setOpen] = useState<Open>(Open.Locked)

    return (
        <div className="flex w-screen justify-start items-start">
            <div
                className={clsx(
                    'fixed top-0 bottom-0 left-0 flex flex-col space-y-2 h-screen max-h-screen flex-shrink-0 py-2 bg-[rgb(251,251,250)] transition-all ease-my-favorite duration-300 ',
                    {
                        ['cursor-col-resize']: isDragging,
                    },
                    isDragging
                        ? 'shadow-[rgba(0,0,0,0.2)_-2px_0px_0px_0px_inset]'
                        : 'shadow-[rgba(0,0,0,0.04)_-2px_0px_0px_0px_inset]',
                    isOpen === Open.Locked
                        ? 'translate-x-0'
                        : '-translate-x-full',
                )}
                style={{ width }}
            >
                <div className="flex justify-between items-center p-2">
                    <div>Non scrolling header</div>
                </div>
                <button
                    className="absolute bg-white p-1 border-y-2 border-r-2 border-[rgba(0,0,0,0.08)] -right-[34px]"
                    onClick={() =>
                        setOpen(isOpen =>
                            isOpen === Open.Hidden ? Open.Locked : Open.Hidden,
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

                <div className="flex flex-col relative z-0 space-y-4">
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
                </div>

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

            <div
                style={{ paddingLeft: isOpen === Open.Locked ? width : 0 }}
                className="flex flex-grow max-h-screen transition-all ease-my-favorite duration-300"
            >
                <div className="w-10"></div>
                <div className="flex flex-col py-12 flex-grow overflow-auto">
                    <div className="prose mx-auto">
                        <h1>{`${isOpen}`}</h1>
                        <Content />
                    </div>
                </div>
            </div>
        </div>
    )
}
