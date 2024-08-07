'use client'

import clsx from 'clsx'
import { useRef, useState, createContext, ReactNode, useContext } from 'react'

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

const SelectedItemContext = createContext<Record<string, boolean>>({})

export function Root({ children }: { children?: ReactNode }) {
    const dragStartPoint = useRef<Point | null>()
    const recentPointerPosition = useRef<{
        containerRect: DOMRect
        clientX: number
        clientY: number
        scrollLeft: number
        scrollTop: number
    } | null>(null)
    const isDragging = useRef(false)
    const [selectionRect, setSelectRect] = useState<DOMRect | null>(null)
    const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
        {},
    )

    function updateSelectedItems(selectionRect: DOMRect) {
        const next: Record<string, boolean> = {}
        document.querySelectorAll('[data-item]').forEach(el => {
            if (!(el instanceof HTMLElement)) return
            if (recentPointerPosition.current == null) return

            const itemRect = el.getBoundingClientRect()
            const translatedItemRect = new DOMRect(
                itemRect.x -
                    recentPointerPosition.current.containerRect.x +
                    recentPointerPosition.current.scrollLeft,
                itemRect.y -
                    recentPointerPosition.current.containerRect.y +
                    recentPointerPosition.current.scrollTop,
                itemRect.width,
                itemRect.height,
            )
            if (!intersect(selectionRect, translatedItemRect)) return

            if (el.dataset.item && typeof el.dataset.item === 'string') {
                next[el.dataset.item] = true
            }
        })
        if (!shallowEqual(next, selectedItems)) {
            setSelectedItems(next)
        }
    }

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
                className="relative z-0 border-2 border-black grid grid-cols-8 sm:grid-cols-10 gap-4 p-4 select-none max-h-96 overflow-auto -translate-y-0.5"
                onScroll={function (e) {
                    if (
                        dragStartPoint.current == null ||
                        recentPointerPosition.current == null ||
                        selectionRect == null
                    )
                        return
                    const containerRect =
                        e.currentTarget.getBoundingClientRect()

                    const xPosition =
                        recentPointerPosition.current.clientX -
                        containerRect.x +
                        recentPointerPosition.current.scrollLeft
                    const yPosition =
                        recentPointerPosition.current.clientY -
                        containerRect.y +
                        recentPointerPosition.current.scrollTop

                    const nextSelectionRect = new DOMRect(
                        Math.min(xPosition, dragStartPoint.current.x),
                        Math.min(yPosition, dragStartPoint.current.y),
                        Math.abs(xPosition - dragStartPoint.current.x),
                        Math.abs(yPosition - dragStartPoint.current.y),
                    )
                    setSelectRect(nextSelectionRect)
                    updateSelectedItems(nextSelectionRect)
                }}
                onPointerDown={function (e) {
                    const containerRect =
                        e.currentTarget.getBoundingClientRect()
                    dragStartPoint.current = {
                        x:
                            e.clientX -
                            containerRect.x +
                            e.currentTarget.scrollLeft,
                        y:
                            e.clientY -
                            containerRect.y +
                            e.currentTarget.scrollTop,
                    }

                    e.currentTarget.setPointerCapture(e.pointerId)
                }}
                onPointerMove={function (e) {
                    if (dragStartPoint.current == null) return
                    const containerRect =
                        e.currentTarget.getBoundingClientRect()

                    const xPosition =
                        e.clientX - containerRect.x + e.currentTarget.scrollLeft
                    const yPosition =
                        e.clientY - containerRect.y + e.currentTarget.scrollTop
                    const nextSelectionRect = new DOMRect(
                        Math.min(xPosition, dragStartPoint.current.x),
                        Math.min(yPosition, dragStartPoint.current.y),
                        Math.abs(xPosition - dragStartPoint.current.x),
                        Math.abs(yPosition - dragStartPoint.current.y),
                    )
                    const selection = document.getSelection()
                    const elementFromPoint = document.elementFromPoint(
                        e.clientX,
                        e.clientY,
                    )
                    assertIsNode(e.target)

                    if (
                        !isDragging.current &&
                        dragDistance(nextSelectionRect) < 15
                    )
                        return
                    if (
                        !selection?.isCollapsed &&
                        selection?.focusNode?.textContent ===
                            elementFromPoint?.textContent
                    )
                        return (dragStartPoint.current = null)

                    isDragging.current = true

                    selection?.removeAllRanges()

                    recentPointerPosition.current = {
                        containerRect,
                        clientX: e.clientX,
                        clientY: e.clientY,
                        scrollLeft: e.currentTarget.scrollLeft,
                        scrollTop: e.currentTarget.scrollTop,
                    }

                    setSelectRect(nextSelectionRect)
                    updateSelectedItems(nextSelectionRect)
                }}
                onPointerUp={function (e) {
                    if (!isDragging.current) {
                        updateSelectedItems(new DOMRect(0, 0, 0, 0))
                    } else {
                        dragStartPoint.current = null
                        setSelectRect(null)
                        recentPointerPosition.current = null
                        isDragging.current = false
                    }
                }}
            >
                <SelectedItemContext.Provider value={selectedItems}>
                    {children}
                </SelectedItemContext.Provider>
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

export function Item({ children, id }: { id: string; children: ReactNode }) {
    const selectedItems = useContext(SelectedItemContext)
    return (
        <div
            data-item={id}
            className={clsx(
                'border-2 size-10 border-black flex justify-center items-center select-text',
                selectedItems[`${id}`]
                    ? 'bg-black text-white'
                    : 'bg-white text-black',
            )}
        >
            {children}
        </div>
    )
}
