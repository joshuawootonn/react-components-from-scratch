'use client'
import clsx from 'clsx'
import { useRef, useState, PointerEvent } from 'react'

const items = new Array(1001).fill(null).map((_, i) => i)

function dragDistance(rect: DOMRect) {
    return Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2))
}

function intersect(rect1: DOMRect, rect2: DOMRect) {
    if (rect1.right < rect2.left || rect2.right < rect1.left) return false

    if (rect1.bottom < rect2.top || rect2.bottom < rect1.top) return false

    return true
}

type Point = { x: number; y: number }

function assertIsNode(e: EventTarget | null): asserts e is Node {
    if (!e || !('nodeType' in e)) {
        throw new Error(`Node expected`)
    }
}

function shallowEqual(x: Record<string, boolean>, y: Record<string, boolean>) {
    return (
        Object.keys(x).length === Object.keys(y).length &&
        Object.keys(x).every(key => x[key] === y[key])
    )
}

export default function DragToSelect() {
    const dragStartPoint = useRef<Point | null>()
    const [selectionRect, setSelectRect] = useState<DOMRect | null>(null)
    const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
        {},
    )

    function updateSelectedItems(
        e: PointerEvent<HTMLDivElement>,
        containerRect: DOMRect,
        selectionRect: DOMRect,
    ) {
        const next: Record<string, boolean> = {}
        document.querySelectorAll('[data-item]').forEach(el => {
            if (!(el instanceof HTMLElement)) return

            const itemRect = el.getBoundingClientRect()
            const translatedItemRect = new DOMRect(
                itemRect.x - containerRect.x,
                itemRect.y - containerRect.y,
                itemRect.width,
                itemRect.height,
            )
            if (!intersect(selectionRect, translatedItemRect)) return

            if (el.dataset.item && typeof el.dataset.item === 'string') {
                next[el.dataset.item] = true
            }

            if (!shallowEqual(next, selectedItems)) {
                setSelectedItems(next)
            }
        })
    }

    return (
        <div
            className="border-2 border-black relative z-0 grid grid-cols-8 sm:grid-cols-10 gap-4 p-4 select-none mt-16"
            onPointerDown={function (e) {
                const containerRect = e.currentTarget.getBoundingClientRect()
                dragStartPoint.current = {
                    x: e.clientX - containerRect.x,
                    y: e.clientY - containerRect.y,
                }

                e.currentTarget.setPointerCapture(e.pointerId)
            }}
            onPointerMove={function (e) {
                if (dragStartPoint.current == null) return
                const containerRect = e.currentTarget.getBoundingClientRect()
                const selectionRect = new DOMRect(
                    Math.min(
                        e.clientX - containerRect.x,
                        dragStartPoint.current.x,
                    ),
                    Math.min(
                        e.clientY - containerRect.y,
                        dragStartPoint.current.y,
                    ),
                    Math.abs(
                        e.clientX - containerRect.x - dragStartPoint.current.x,
                    ),
                    Math.abs(
                        e.clientY - containerRect.y - dragStartPoint.current.y,
                    ),
                )
                const selection = document.getSelection()
                const elementFromPoint = document.elementFromPoint(
                    e.clientX,
                    e.clientY,
                )
                assertIsNode(e.target)

                if (dragDistance(selectionRect) < 15) return
                if (
                    !selection?.isCollapsed &&
                    selection?.focusNode?.textContent ===
                        elementFromPoint?.textContent
                )
                    return (dragStartPoint.current = null)

                selection?.removeAllRanges()

                setSelectRect(selectionRect)
                updateSelectedItems(e, containerRect, selectionRect)
            }}
            onPointerUp={function (e) {
                dragStartPoint.current = null
                setSelectRect(null)
            }}
        >
            <div className="absolute -translate-y-full -translate-x-0.5 top-0 left-0 px-2 border-2 border-black">
                selectable area
            </div>
            {Object.keys(selectedItems).length > 0 && (
                <div className="absolute -translate-y-full translate-x-0.5 top-0 right-0 px-2 border-2 border-black">
                    count: {Object.keys(selectedItems).length}
                </div>
            )}
            {items.map(item => (
                <div
                    key={item}
                    data-item={item}
                    className={clsx(
                        'border-2 size-10 border-black flex justify-center items-center select-text',
                        selectedItems[`${item}`]
                            ? 'bg-black text-white'
                            : 'bg-white text-black',
                    )}
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
    )
}
