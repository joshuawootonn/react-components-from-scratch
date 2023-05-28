import clsx from 'clsx'
import { PointerEvent as ReactPointerEvent, useRef, useState } from 'react'

import { TreeviewArrow } from 'components/treeview/article/part-3/animatedTreeview'
import { nextprojectInitialValues } from 'lib/treeview'

export default function SplitterPage() {
    const [selected, select] = useState<string | null>(null)
    const [width, setWidth] = useState(250)
    const originalWidth = useRef(width)
    const originalClientX = useRef(width)
    const [isDragging, setDragging] = useState(false)
    const [isOpen, setOpen] = useState(false)

    return (
        <div className="flex">
            <div
                className={clsx(
                    'h-screen max-h-screen overflow-y-auto flex-shrink-0',
                    {
                        ['cursor-col-resize']: isDragging,
                    },
                )}
                style={{ width }}
            >
                <TreeviewArrow.Root
                    value={selected}
                    onChange={select}
                    className="p-2 not-prose"
                    label="File Explorer"
                >
                    {nextprojectInitialValues.map(node => (
                        <TreeviewArrow.Node node={node} key={node.id} />
                    ))}
                </TreeviewArrow.Root>
            </div>

            <div
                onPointerDown={(e: ReactPointerEvent) => {
                    const { ownerDocument } = e.currentTarget
                    originalWidth.current = width
                    originalClientX.current = e.clientX
                    setDragging(true)

                    function onPointerMove(e: PointerEvent) {
                        setWidth(
                            originalWidth.current +
                                e.clientX -
                                originalClientX.current,
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
                className={clsx('w-2 cursor-col-resize shrink-0 shadow', {
                    ['bg-gray-50']: isDragging,
                })}
            />
            <div className="">main content</div>
        </div>
    )
}
