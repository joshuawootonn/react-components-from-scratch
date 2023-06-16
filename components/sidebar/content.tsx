import clsx from 'clsx'
import clamp from 'lodash.clamp'
import Link from 'next/link'
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react'

type TruckProps = {
    isFast: boolean
    width: number
    height: number
    offset: number
}

function Truck(props: TruckProps) {
    const [positionY] = useState(() => Math.random() * props.height)
    const [speed] = useState(() => Math.random())

    const direction = Math.cos((props.offset * speed) / 100) > 0

    const positionX =
        (Math.sin((props.offset * speed) / 100) * props.width + props.width) / 2

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute w-6 h-6 -z-10"
            style={
                !props.isFast
                    ? {
                          left: `${positionX}px`,
                          top: `${positionY}px`,
                          transform: direction
                              ? 'rotateY(0deg)'
                              : 'rotateY(180deg)',
                      }
                    : {
                          top: `${positionY}px`,
                          transform: direction
                              ? `translateX(${positionX}px) rotateY(0deg)`
                              : `translateX(${positionX}px) rotateY(180deg)`,
                      }
            }
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
    const [isFast, setFast] = useState(false)
    const [rect, setRect] = useState<DOMRect>()
    const ref = useRef<HTMLDivElement | null>(null)
    const [offset, setOffset] = useState(0)
    const requestRef = useRef<number>(0)

    useEffect(() => {
        if (ref.current) setRect(ref.current.getBoundingClientRect())
    }, [ref])

    useEffect(() => {
        const animate = () => {
            setOffset(prev => prev + 1)
            requestRef.current = requestAnimationFrame(animate)
        }
        requestRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(requestRef.current)
    }, [])

    return (
        <div ref={ref} {...props} className={clsx('relative', props.className)}>
            {rect &&
                new Array(number)
                    .fill('')
                    .map((_, i) => (
                        <Truck
                            key={i}
                            width={rect.width}
                            height={rect.height}
                            offset={offset}
                            isFast={isFast}
                        />
                    ))}
            <div className="flex w-min mx-auto border-gray-100 border-2 rounded-md p-2 -translate-y-1/2 justify-center items-center bg-white">
                <button
                    onClick={() => setNumber(prev => clamp(prev + 5, 0, 5000))}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
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
                <input
                    className="w-20 text-3xl text-center"
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
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 12h-15"
                        />
                    </svg>
                </button>

                <button className="ml-3" onClick={() => setFast(prev => !prev)}>
                    {!isFast ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.412 15.655L9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457L3 3m5.457 5.457l7.086 7.086m0 0L21 21"
                            />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    )
}

export function Content() {
    return (
        <>
            <PerfSlayer className="h-96 w-full mb-12" />

            <div className="flex space-x-4">
                <Link href="/splitter/gitlab">Gitlab</Link>
                <Link href="/splitter/linear">Linear</Link>
                <Link href="/splitter/notion">Notion</Link>
                <Link href="/splitter/makeswift">Makeswift</Link>
            </div>
            <p>
                <strong>Pellentesque habitant morbi tristique</strong> senectus
                et netus et malesuada fames ac turpis egestas. Vestibulum tortor
                quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
                Donec eu libero sit amet quam egestas semper.{' '}
                <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend
                leo. Quisque sit amet est et sapien ullamcorper pharetra.
                Vestibulum erat wisi, condimentum sed,{' '}
                <code>commodo vitae</code>, ornare sit amet, wisi. Aenean
                fermentum, elit eget tincidunt condimentum, eros ipsum rutrum
                orci, sagittis tempus lacus enim ac dui.{' '}
                <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut
                felis.
            </p>

            <h2>Header Level 2</h2>

            <ol>
                <li>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                </li>
                <li>Aliquam tincidunt mauris eu risus.</li>
            </ol>

            <blockquote>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus magna. Cras in mi at felis aliquet congue. Ut a est
                    eget ligula molestie gravida. Curabitur massa. Donec
                    eleifend, libero at sagittis mollis, tellus est malesuada
                    tellus, at luctus turpis elit sit amet quam. Vivamus pretium
                    ornare est.
                </p>
            </blockquote>

            <h3>Header Level 3</h3>

            <ul>
                <li>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                </li>
                <li>Aliquam tincidunt mauris eu risus.</li>
            </ul>

            <pre>
                <code>
                    {`#header h1 a {
display: block;
width: 300px;
height: 80px;
}`}
                </code>
            </pre>
            <h2>Header Level 2</h2>

            <ol>
                <li>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                </li>
                <li>Aliquam tincidunt mauris eu risus.</li>
            </ol>

            <blockquote>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus magna. Cras in mi at felis aliquet congue. Ut a est
                    eget ligula molestie gravida. Curabitur massa. Donec
                    eleifend, libero at sagittis mollis, tellus est malesuada
                    tellus, at luctus turpis elit sit amet quam. Vivamus pretium
                    ornare est.
                </p>
            </blockquote>

            <h3>Header Level 3</h3>

            <ul>
                <li>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                </li>
                <li>Aliquam tincidunt mauris eu risus.</li>
            </ul>

            <pre>
                <code>
                    {`#header h1 a {
display: block;
width: 300px;
height: 80px;
}`}
                </code>
            </pre>
        </>
    )
}
