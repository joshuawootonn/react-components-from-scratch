import clsx from 'clsx'
import {
    useAnimate,
    DOMKeyframesDefinition,
    AnimationOptionsWithValueOverrides,
} from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

export function InitialDemo() {
    const [isOpen, setIsOpen] = useState(true)
    const [ref, animate] = useAnimate()
    const [sidebarCode, setSidebarCode] = useState('')

    /**
     * Created this wrapper on the animate call because the types are wrong for
     * the second param. It doesn't include attrX/attrY.
     * Also because I wanted to specify the transition once, and MotionConfig would have to be
     * outside of this component _if_ `useAnimate` even listens to it.
     */
    const animateSVG = useCallback(
        async (
            selector: string,
            values: DOMKeyframesDefinition & {
                attrX?: number
                attrY?: number
            },
            options?: AnimationOptionsWithValueOverrides,
        ) => {
            await animate(selector, values, {
                ...options,
                ease: [0.165, 0.84, 0.44, 1],
                duration: 0.3,
            })
        },
        [animate],
    )

    useEffect(() => {
        async function open() {
            await animateSVG('[data-content]', {
                attrX: 41.5,
                width: 116.5,
            })
            await animateSVG(
                '[data-sidebar]',
                { width: 39.5, opacity: 1 },
                {
                    onPlay: () =>
                        setSidebarCode(`width: auto; 
opacity: 1;`),
                },
            )
        }
        async function close() {
            await animateSVG(
                '[data-sidebar]',
                {
                    width: 0,
                    opacity: 0,
                },
                {
                    onPlay: () =>
                        setSidebarCode(`width: 0px;
opacity: 0;`),
                },
            )
            await animateSVG('[data-content]', {
                attrX: 2,
                width: 156,
            })
        }

        isOpen ? open() : close()
    }, [animate, animateSVG, isOpen])

    return (
        <div
            className={clsx(
                `prose-pre:rounded-none prose-pre:bg-black prose-pre:mt-0`,
            )}
        >
            <svg
                ref={ref}
                className="w-full aspect-[3/2]"
                viewBox="0 0 160 100"
            >
                <defs>
                    <pattern
                        id="asdf"
                        patternUnits="userSpaceOnUse"
                        width="7.5"
                        height="7.5"
                        patternTransform="rotate(45)"
                    >
                        <line
                            x1="0"
                            y="0"
                            x2="0"
                            y2="7.5"
                            className="stroke-slate-200"
                            strokeWidth="2"
                        />
                    </pattern>
                </defs>
                <rect
                    className="stroke-slate-200"
                    fill="url(#asdf)"
                    x={1}
                    width={158}
                    y={1}
                    height={98}
                ></rect>
                <rect
                    x={1}
                    fill="white"
                    y={1}
                    width="17.5"
                    height="9"
                    className="stroke-slate-200"
                />
                <text
                    x={1.5}
                    y={1.5}
                    width="40"
                    height="40"
                    className="absolute translate-x-[2px] translate-y-[5px] top-0 leading-none text-[5px] p-[1px] font-bold text-slate-200 fill-current"
                >
                    page
                </text>

                <g>
                    <rect
                        data-sidebar
                        stroke="white"
                        fill="transparent"
                        x={2}
                        y={2}
                        width={39.5}
                        height={96}
                    />
                    <rect
                        data-sidebar
                        stroke="black"
                        strokeDasharray={'3 2'}
                        fill="white"
                        width={39.5}
                        x={2}
                        y={2}
                        height={96}
                    />
                    {/* <rect
                        data-sidebar
                        x={2}
                        y={2}
                        fill="white"
                        stroke="black"
                        width="22"
                        height="9"
                        className=""
                    /> */}
                    <text
                        data-sidebar
                        x={2}
                        y={1.5}
                        width={39.5}
                        height="20"
                        className="absolute translate-x-[2px] translate-y-[6px]  top-0 leading-none text-[5px] font-bold text-black"
                    >
                        sidebar
                    </text>
                </g>

                <g>
                    <rect
                        data-content
                        stroke="black"
                        fill="white"
                        x={41.5}
                        width={116}
                        y={2}
                        height={96}
                    />

                    <text
                        data-content
                        x={41.5}
                        y={1.5}
                        width="100"
                        height="20"
                        className="absolute translate-x-[2px] translate-y-[6px]  top-0 leading-none text-[5px] font-bold text-black"
                    >
                        content
                    </text>
                </g>
            </svg>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <button
                    className="sm:col-span-2 text-lg font-bold border-4 border-black px-3 py-0.5"
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    {isOpen ? 'close' : 'open'} sidebar
                </button>
                <div>
                    <div className="text-black font-bold text-lg border-black border-4 p-1">
                        sidebar
                    </div>
                    <pre className="relative">
                        <code>
                            <div>position: fixed;</div>
                            <div>top: 0;</div>
                            <div>left: 0;</div>
                            <div>bottom: 0;</div>
                            <div>width: 160px;</div>
                            <div>{sidebarCode}</div>
                        </code>
                    </pre>
                </div>

                <div>
                    <div className="text-black font-bold text-lg border-black border-4 p-1">
                        page
                    </div>
                    <pre>
                        <code>
                            <div>display: flex;</div>
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    )
}
