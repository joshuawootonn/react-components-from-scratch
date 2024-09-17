'use client'

import clsx from 'clsx'
import {
    useRef,
    useState,
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useCallback,
} from 'react'

function diagonalLength(rect: DOMRect): number {
    return Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2))
}

function intersect(rect1: DOMRect, rect2: DOMRect): boolean {
    if (rect1.right < rect2.left || rect2.right < rect1.left) return false

    if (rect1.bottom < rect2.top || rect2.bottom < rect1.top) return false

    return true
}

function shallowEqual(x: Record<string, boolean>, y: Record<string, boolean>) {
    return (
        Object.keys(x).length === Object.keys(y).length &&
        Object.keys(x).every(key => x[key] === y[key])
    )
}

type Point = { x: number; y: number }

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
    const [isDragging, setIsDragging] = useState(false)
    const [selectionRect, setSelectRect] = useState<DOMRect | null>(null)
    const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
        {},
    )
    const containerRef = useRef<HTMLDivElement>(null)

    const updateSelectedItems = useCallback(
        function updateSelectedItems(selectionRect: DOMRect) {
            if (containerRef.current == null) return
            const next: Record<string, boolean> = {}
            containerRef.current.querySelectorAll('[data-item]').forEach(el => {
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
        },
        [selectedItems],
    )

    useEffect(() => {
        if (!isDragging || containerRef.current == null) return

        let handle = requestAnimationFrame(scrollTheLad)

        return () => cancelAnimationFrame(handle)

        function scrollTheLad() {
            if (
                recentPointerPosition.current == null ||
                dragStartPoint.current == null ||
                containerRef.current == null
            )
                return

            const { clientX, clientY, containerRect, scrollTop, scrollLeft } =
                recentPointerPosition.current
            const xPosition = clientX - containerRect.x
            const yPosition = clientY - containerRect.y

            const shouldScrollRight = containerRect.width - xPosition < 20
            const shouldScrollDown = containerRect.height - yPosition < 20
            const shouldScrollLeft = xPosition < 20
            const shouldScrollUp = yPosition < 20

            if (
                !shouldScrollRight &&
                !shouldScrollDown &&
                !shouldScrollLeft &&
                !shouldScrollUp
            ) {
                handle = requestAnimationFrame(scrollTheLad)
                return
            }

            if (shouldScrollRight) {
                containerRef.current.scrollBy({
                    left: 20 - containerRect.width + xPosition,
                })
            } else if (shouldScrollDown) {
                containerRef.current.scrollBy({
                    top: 20 - containerRect.height + yPosition,
                })
            } else if (shouldScrollLeft) {
                containerRef.current.scrollBy({ left: -20 + xPosition })
            } else if (shouldScrollUp) {
                containerRef.current.scrollBy({ top: -20 + yPosition })
            }

            const scrollXPosition = clientX - containerRect.x + scrollLeft
            const scrollYPosition = clientY - containerRect.y + scrollTop
            const nextSelectionRect = new DOMRect(
                Math.min(scrollXPosition, dragStartPoint.current.x),
                Math.min(scrollYPosition, dragStartPoint.current.y),
                Math.abs(scrollXPosition - dragStartPoint.current.x),
                Math.abs(scrollYPosition - dragStartPoint.current.y),
            )

            updateSelectedItems(nextSelectionRect)

            handle = requestAnimationFrame(scrollTheLad)
        }
    }, [isDragging, updateSelectedItems])

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
                className="relative z-0 border-2 border-black grid grid-cols-8 sm:grid-cols-10 gap-4 p-4  max-h-96 overflow-auto -translate-y-0.5"
                ref={containerRef}
                onScroll={function (e) {
                    if (
                        dragStartPoint.current == null ||
                        recentPointerPosition.current == null ||
                        selectionRect == null
                    )
                        return
                    const containerRect =
                        e.currentTarget.getBoundingClientRect()

                    const { scrollHeight, scrollWidth, scrollTop, scrollLeft } =
                        e.currentTarget

                    const scrollXPosition =
                        recentPointerPosition.current.clientX -
                        containerRect.x +
                        recentPointerPosition.current.scrollLeft
                    const scrollYPosition =
                        recentPointerPosition.current.clientY -
                        containerRect.y +
                        recentPointerPosition.current.scrollTop

                    const nextSelectionRect = new DOMRect(
                        Math.min(scrollXPosition, dragStartPoint.current.x),
                        Math.min(scrollYPosition, dragStartPoint.current.y),
                        Math.abs(
                            Math.min(scrollXPosition, scrollWidth) -
                                dragStartPoint.current.x,
                        ),
                        Math.abs(
                            Math.min(scrollYPosition, scrollHeight) -
                                dragStartPoint.current.y,
                        ),
                    )

                    recentPointerPosition.current = {
                        ...recentPointerPosition.current,
                        scrollLeft: scrollLeft,
                        scrollTop: scrollTop,
                    }

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
                    const { scrollWidth, scrollHeight } = e.currentTarget
                    const containerRect =
                        e.currentTarget.getBoundingClientRect()

                    const scrollXPosition =
                        e.clientX - containerRect.x + e.currentTarget.scrollLeft
                    const scrollYPosition =
                        e.clientY - containerRect.y + e.currentTarget.scrollTop
                    const nextSelectionRect = new DOMRect(
                        Math.min(scrollXPosition, dragStartPoint.current.x),
                        Math.min(scrollYPosition, dragStartPoint.current.y),
                        Math.abs(
                            Math.min(scrollXPosition, scrollWidth) -
                                dragStartPoint.current.x,
                        ),
                        Math.abs(
                            Math.min(scrollYPosition, scrollHeight) -
                                dragStartPoint.current.y,
                        ),
                    )
                    const selection = document.getSelection()
                    const elementFromPoint = document.elementFromPoint(
                        e.clientX,
                        e.clientY,
                    )

                    if (!isDragging && diagonalLength(nextSelectionRect) < 10)
                        return
                    if (
                        !selection?.isCollapsed &&
                        selection?.focusNode?.textContent ===
                            elementFromPoint?.textContent
                    )
                        return (dragStartPoint.current = null)

                    setIsDragging(true)

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
                onPointerUp={function () {
                    if (!isDragging) {
                        setSelectedItems({})
                        dragStartPoint.current = null
                        setSelectRect(null)
                        recentPointerPosition.current = null
                    } else {
                        dragStartPoint.current = null
                        setSelectRect(null)
                        setIsDragging(false)
                        recentPointerPosition.current = null
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
                'border-2 size-10 border-black flex justify-center items-center',
                selectedItems[`${id}`]
                    ? 'bg-black text-white'
                    : 'bg-white text-black',
            )}
        >
            {children}
        </div>
    )
}
