import clsx from 'clsx'
import clamp from 'lodash.clamp'
import Link from 'next/link'
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react'

function Truck() {
    const [positionY] = useState(() => Math.random())
    const [speed] = useState(() => Math.random())

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
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
    const [rect, setRect] = useState<DOMRect>()
    const ref = useRef<HTMLDivElement | null>(null)
    const offset = useRef(0)
    const requestRef = useRef<number>(0)

    useEffect(() => {
        if (ref.current) setRect(ref.current.getBoundingClientRect())
    }, [ref])

    useEffect(() => {
        const animate = () => {
            offset.current = offset.current + 1
            if (rect == null) return

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
    }, [, rect])

    return (
        <div ref={ref} {...props} className={clsx('relative', props.className)}>
            {rect &&
                new Array(number).fill('').map((_, i) => <Truck key={i} />)}
            <div className="flex w-min mx-auto border-gray-100 border-2 rounded-md p-2 translate-y-1/4 justify-center items-center bg-white">
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
            </div>
        </div>
    )
}

export function Content() {
    return (
        <>
            <h2>Links to other sidebar examples</h2>
            <div className="flex space-x-4">
                <Link href="/sidebar/initial">Initial</Link>
                <Link href="/sidebar/linear">Linear</Link>
                <Link href="/sidebar/notion">Notion</Link>
                <Link href="/sidebar/gitlab">Gitlab</Link>
            </div>
            <h2 className="">
                Increase this value to intentionally bottle neck the main thread
            </h2>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="text-center animate-bounce ease-in-out mx-auto w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                />
            </svg>

            <PerfSlayer className="h-96 w-full mb-12" />

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
