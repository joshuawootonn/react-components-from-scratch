'use client'
import clsx from 'clsx'
import { useState } from 'react'

const items = new Array(30).fill(null).map((_, i) => i)

class DOMVector {
    constructor(
        readonly x: number,
        readonly y: number,
        readonly magnitudeX: number,
        readonly magnitudeY: number,
    ) {
        this.x = x
        this.y = y
        this.magnitudeX = magnitudeX
        this.magnitudeY = magnitudeY
    }

    toDOMRect(): DOMRect {
        return new DOMRect(
            Math.min(this.x, this.x + this.magnitudeX),
            Math.min(this.y, this.y + this.magnitudeY),
            Math.abs(this.magnitudeX),
            Math.abs(this.magnitudeY),
        )
    }
}

function Root() {
    const [dragVector, setDragVector] = useState<DOMVector | null>(null)

    const selectionRect = dragVector ? dragVector.toDOMRect() : null

    return (
        <div>
            <div className="px-2 border-2 border-black">selectable area</div>
            <div
                onPointerDown={e => {
                    if (e.button !== 0) return

                    const containerRect =
                        e.currentTarget.getBoundingClientRect()

                    setDragVector(
                        new DOMVector(
                            e.clientX - containerRect.x,
                            e.clientY - containerRect.y,
                            0,
                            0,
                        ),
                    )
                }}
                onPointerMove={e => {
                    if (dragVector == null) return

                    const containerRect =
                        e.currentTarget.getBoundingClientRect()

                    const nextDragVector = new DOMVector(
                        dragVector.x,
                        dragVector.y,
                        e.clientX - containerRect.x - dragVector.x,
                        e.clientY - containerRect.y - dragVector.y,
                    )

                    setDragVector(nextDragVector)
                }}
                onPointerUp={() => {
                    setDragVector(null)
                }}
                className="relative z-0 grid grid-cols-8 sm:grid-cols-10 gap-4 p-4 border-2 border-black -translate-y-0.5"
            >
                {items.map(item => (
                    <div
                        className={clsx(
                            'border-2 size-10 border-black flex justify-center items-center',
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

export function Step15Demo() {
    return <Root />
}
