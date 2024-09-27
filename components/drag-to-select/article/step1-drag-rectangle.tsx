'use client'
import clsx from 'clsx'
import { useState } from 'react'

const items = new Array(30).fill(null).map((_, i) => i)

function Root() {
    const [selectionRect, setSelectRect] = useState<DOMRect | null>(null)

    return (
        <div>
            <div className="px-2 border-2 border-black">selectable area</div>
            <div
                onPointerDown={e => {
                    const containerRect =
                        e.currentTarget.getBoundingClientRect()

                    const x = e.clientX - containerRect.x
                    const y = e.clientY - containerRect.y

                    const nextSelectionRect = new DOMRect(x, y, 0, 0)
                    setSelectRect(nextSelectionRect)
                }}
                onPointerMove={e => {
                    if (selectionRect == null) return

                    const containerRect =
                        e.currentTarget.getBoundingClientRect()

                    const x = e.clientX - containerRect.x
                    const y = e.clientY - containerRect.y

                    const nextSelectionRect = new DOMRect(
                        Math.min(x, selectionRect.x),
                        Math.min(y, selectionRect.y),
                        Math.abs(x - selectionRect.x),
                        Math.abs(y - selectionRect.y),
                    )

                    setSelectRect(nextSelectionRect)
                }}
                onPointerUp={() => {
                    setSelectRect(null)
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

export function Step1Demo() {
    return <Root />
}
