import clsx from 'clsx'
import {
    useAnimate,
    DOMKeyframesDefinition,
    AnimationOptionsWithValueOverrides,
} from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

export function GitlabDemo() {
    const [isOpen, setIsOpen] = useState(false)
    const [ref, animate] = useAnimate()
    const [sidebarCode, setSidebarCode] = useState('')
    const [contentCode, setContentCode] = useState('')

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
            await animateSVG(
                '[data-content]',
                {
                    attrX: 81,
                    width: 76.5,
                },
                {
                    onPlay: () => setContentCode(`padding-left: 160px;`),
                },
            )
            await animateSVG(
                '[data-sidebar]',
                { attrX: 41.5 },
                {
                    onPlay: () => setSidebarCode(`transform: translateX(0%);`),
                },
            )
        }
        async function close() {
            await animateSVG(
                '[data-sidebar]',
                {
                    attrX: 2,
                },
                {
                    onPlay: () =>
                        setSidebarCode(`transform: translateX(-100%);`),
                },
            )
            await animateSVG(
                '[data-content]',
                {
                    attrX: 41.5,
                    width: 116,
                },
                {
                    onPlay: () => setContentCode(`padding-left: 0px;`),
                },
            )
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
                        id="pattern"
                        patternUnits="userSpaceOnUse"
                        width="4.5"
                        height="4.5"
                        patternTransform="rotate(-25)"
                    >
                        <line
                            x1="0"
                            y="0"
                            x2="0"
                            y2="7.5"
                            className="stroke-slate-200"
                            strokeWidth="2"
                        />
                        <line
                            x1="0"
                            y="0"
                            x2="7.5"
                            y2="0"
                            className="stroke-slate-200"
                            strokeWidth="2"
                        />
                    </pattern>
                </defs>
                <rect
                    className="stroke-slate-200"
                    fill="url(#pattern)"
                    x={40.5}
                    width={118}
                    y={1}
                    height={98}
                ></rect>
                <rect
                    x={40.5}
                    fill="white"
                    y={1}
                    width="16.5"
                    height="9"
                    className="stroke-slate-200"
                />
                <text
                    x={41}
                    y={1.5}
                    width="40"
                    height="40"
                    className="absolute translate-x-[2px] translate-y-[5px] top-0 leading-none text-[5px] p-[1px] font-bold fill-slate-200"
                >
                    page
                </text>

                <rect
                    data-sidebar
                    stroke="white"
                    fill="transparent"
                    x={2}
                    width={39.5}
                    y={2}
                    height={96}
                />
                <rect
                    data-sidebar
                    stroke="black"
                    strokeDasharray={'3 2'}
                    fill="white"
                    x={2}
                    width={39.5}
                    y={2}
                    height={96}
                />

                <text
                    data-sidebar
                    x={2}
                    y={1.5}
                    width="100"
                    height="20"
                    className="absolute translate-x-[2px] translate-y-[6px] top-0 leading-none text-[5px] p-[2px_1px_1px_1.5px] font-bold text-black border-dashed border-black border-b-[1px] border-r-[1px]"
                >
                    sidebar
                </text>

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
                    className="absolute translate-x-[2px] translate-y-[6px] top-0 leading-none text-[5px] p-[2px_1px_1px_1.5px] font-bold text-black border-black border-b-[1px] border-r-[1px]"
                >
                    content
                </text>
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
                    <pre>
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
                        content
                    </div>
                    <pre>
                        <code>
                            <div>{contentCode}</div>
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    )
}
