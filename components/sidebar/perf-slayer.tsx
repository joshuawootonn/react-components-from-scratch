import clsx from 'clsx'
import clamp from 'lodash.clamp'
import { useState, ComponentPropsWithoutRef, useRef, useEffect } from 'react'

function Truck() {
    const [positionY] = useState(() => Math.random())
    const [speed] = useState(() => Math.random())

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="absolute w-6 h-6 -z-10"
            data-truck
            data-speed={speed}
            data-positiony={positionY}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
        </svg>
    )
}

export function PerfSlayer(props: ComponentPropsWithoutRef<'div'>) {
    const [number, setNumber] = useState(5)
    const ref = useRef<HTMLDivElement | null>(null)
    const offset = useRef(0)
    const requestRef = useRef<number>(0)

    useEffect(() => {
        const animate = () => {
            offset.current = offset.current + 1
            if (number === 0 || ref.current == null) return

            const rect = ref.current.getBoundingClientRect()

            document
                .querySelectorAll<SVGElement>('[data-truck]')
                .forEach(truck => {
                    const speed = parseFloat(truck.dataset.speed ?? '0')
                    const positionY = parseFloat(
                        truck.dataset['positiony'] ?? '0',
                    )

                    const direction =
                        Math.cos((offset.current * speed) / 100) > 0

                    const positionX =
                        (Math.sin((offset.current * speed) / 100) * rect.width +
                            rect.width) /
                        2

                    truck.style.top = `${positionY * rect.height}px`
                    truck.style.left = `${positionX}px`
                    truck.style.transform = `rotateY(${
                        direction ? '0deg' : '180deg'
                    }) translateX(-50%)`
                })

            requestRef.current = requestAnimationFrame(animate)
        }
        requestRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(requestRef.current)
    }, [number])

    return (
        <div {...props} className={clsx('relative p-4', props.className)}>
            {new Array(number).fill('').map((_, i) => (
                <Truck key={i} />
            ))}

            <div className="relative flex w-min mx-auto border-black border-4 p-2 translate-y-1/4 justify-center items-center bg-white">
                <button
                    onClick={() => setNumber(prev => clamp(prev + 5, 0, 5000))}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3.5}
                    stroke="currentColor"
                    className="absolute -top-10 text-center animate-bounce ease-in-out mx-auto w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                    />
                </svg>
                <input
                    className="w-20 font-semibold text-3xl text-center"
                    value={number}
                    onChange={e => {
                        const num = parseInt(e.currentTarget.value)
                        isNaN(num)
                            ? setNumber(0)
                            : setNumber(clamp(num, 0, 5000))
                    }}
                ></input>
                <button
                    onClick={() => setNumber(prev => clamp(prev - 5, 0, 5000))}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path d="M19.5 12h-15" />
                    </svg>
                </button>
            </div>
            <div ref={ref} className="h-full w-full"></div>
        </div>
    )
}
