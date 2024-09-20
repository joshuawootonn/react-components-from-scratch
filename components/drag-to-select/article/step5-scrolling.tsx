'use client'
import clsx from 'clsx'
import { useCallback, useRef, useState } from 'react'

const items = new Array(300).fill(null).map((_, i) => i)

function diagonalLength(rect: DOMRect): number {
    return Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2))
}

function intersect(rect1: DOMRect, rect2: DOMRect) {
    if (rect1.right < rect2.left || rect2.right < rect1.left) return false

    if (rect1.bottom < rect2.top || rect2.bottom < rect1.top) return false

    return true
}

function Root() {
    const dragStartPoint = useRef<DOMPoint | null>()
    const [selectionRect, setSelectRect] = useState<DOMRect | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
        {},
    )
    const containerRef = useRef<HTMLDivElement>(null)

    const updateSelectedItems = useCallback(function updateSelectedItems(
        selectionRect: DOMRect,
    ) {
        if (containerRef.current == null) return
        const next: Record<string, boolean> = {}
        const containerRect = containerRef.current.getBoundingClientRect()
        containerRef.current.querySelectorAll('[data-item]').forEach(el => {
            if (containerRef.current == null || !(el instanceof HTMLElement))
                return

            const itemRect = el.getBoundingClientRect()
            const x =
                itemRect.x - containerRect.x + containerRef.current.scrollLeft
            const y =
                itemRect.y - containerRect.y + containerRef.current.scrollTop
            const translatedItemRect = new DOMRect(
                x,
                y,
                itemRect.width,
                itemRect.height,
            )
            if (!intersect(selectionRect, translatedItemRect)) return

            if (el.dataset.item && typeof el.dataset.item === 'string') {
                next[el.dataset.item] = true
            }
        })

        setSelectedItems(next)
    },
    [])

    return (
        <div>
            <div className="flex flex-row justify-between">
                <div className="px-2 border-2 border-black">
                    selectable area
                </div>
                {Object.keys(selectedItems).length > 0 && (
                    <div className="px-2 border-2 border-black">
                        count: {Object.keys(selectedItems).length}
                    </div>
                )}
            </div>
            <div
                ref={containerRef}
                onPointerDown={e => {
                    const containerRect =
                        e.currentTarget.getBoundingClientRect()

                    const x =
                        e.clientX - containerRect.x + e.currentTarget.scrollLeft
                    const y =
                        e.clientY - containerRect.y + e.currentTarget.scrollTop

                    dragStartPoint.current = new DOMPoint(x, y)

                    e.currentTarget.setPointerCapture(e.pointerId)
                }}
                onPointerMove={e => {
                    if (dragStartPoint.current == null) return

                    const containerRect =
                        e.currentTarget.getBoundingClientRect()

                    const x =
                        e.clientX - containerRect.x + e.currentTarget.scrollLeft
                    const y =
                        e.clientY - containerRect.y + e.currentTarget.scrollTop

                    const nextSelectionRect = new DOMRect(
                        Math.min(x, dragStartPoint.current.x),
                        Math.min(y, dragStartPoint.current.y),
                        Math.abs(
                            Math.min(x, e.currentTarget.scrollWidth) -
                                dragStartPoint.current.x,
                        ),
                        Math.abs(
                            Math.min(y, e.currentTarget.scrollHeight) -
                                dragStartPoint.current.y,
                        ),
                    )

                    const selection = document.getSelection()
                    const elementFromPoint = document.elementFromPoint(
                        e.clientX,
                        e.clientY,
                    )

                    if (!isDragging && diagonalLength(nextSelectionRect) < 5)
                        return
                    if (
                        !selection?.isCollapsed &&
                        selection?.focusNode?.textContent ===
                            elementFromPoint?.textContent
                    ) {
                        setIsDragging(false)
                        setSelectRect(null)
                        dragStartPoint.current = null
                        return
                    }

                    selection?.removeAllRanges()
                    setIsDragging(true)
                    containerRef.current?.focus()

                    setSelectRect(nextSelectionRect)
                    updateSelectedItems(nextSelectionRect)
                }}
                onPointerUp={() => {
                    if (!isDragging) {
                        setSelectedItems({})
                        dragStartPoint.current = null
                        setSelectRect(null)
                    } else {
                        dragStartPoint.current = null
                        setSelectRect(null)
                        setIsDragging(false)
                    }
                }}
                tabIndex={-1}
                onKeyDown={e => {
                    if (e.key === 'Escape') {
                        e.preventDefault()
                        setSelectedItems({})
                        dragStartPoint.current = null
                        setSelectRect(null)
                    }
                }}
                className={clsx(
                    'relative max-h-96 overflow-auto z-0 grid grid-cols-[repeat(20,min-content)] gap-4 p-4',
                    'border-2 border-black focus:outline-none focus:border-dashed -translate-y-0.5',
                )}
            >
                {items.map(item => (
                    <div
                        data-item={item}
                        className={clsx(
                            'border-2 size-10 border-black flex justify-center items-center',
                            selectedItems[`${item}`]
                                ? 'bg-black text-white'
                                : 'bg-white text-black',
                        )}
                        key={item}
                    >
                        {item}
                    </div>
                ))}
                {selectionRect && (
                    <div
                        className="absolute border-black border-2 bg-black/30"
                        style={{
                            top: selectionRect.y,
                            left: selectionRect.x,
                            width: selectionRect.width,
                            height: selectionRect.height,
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export function Step5Demo() {
    return <Root />
}
