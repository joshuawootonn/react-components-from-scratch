import clsx from 'clsx'
import {
    useAnimate,
    DOMKeyframesDefinition,
    AnimationOptionsWithValueOverrides,
} from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

export function NotionDemo() {
    const [isOpen, setIsOpen] = useState(true)
    const [isLocked, setIsLocked] = useState(true)
    const [ref, animate] = useAnimate()
    const [sidebarCode, setSidebarCode] = useState('')
    const [containerCode, setContainerCode] = useState('')

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
        async function openUnlocked() {
            await animateSVG(
                '[data-sidebar]',
                {
                    attrX: 42.5,
                    height: 73.5,
                    attrY: 16.5,
                },
                {
                    onPlay: () =>
                        setSidebarCode(
                            `transform: translateX(0px) translateY(60px);
max-height: calc(100vh - 120px);`,
                        ),
                },
            )
            animateSVG('[data-content]', {
                attrX: 41.5,
                width: 116,
            })
            await animateSVG(
                '[data-container]',
                { width: 1 },
                {
                    onPlay: () => setContainerCode(`width: 0px;`),
                },
            )
        }
        async function closeUnlocked() {
            await animateSVG(
                '[data-sidebar]',
                {
                    attrX: 4,
                    height: 73.5,
                    attrY: 16.5,
                },
                {
                    onPlay: () =>
                        setSidebarCode(`transform: translateX(-160px) translateY(60px);
max-height: calc(100vh - 120px);`),
                },
            )
            animateSVG('[data-content]', {
                attrX: 41.5,
                width: 116,
            })
            await animateSVG(
                '[data-container]',
                { width: 1 },
                {
                    onPlay: () => setContainerCode(`width: 0px;`),
                },
            )
        }
        async function openLocked() {
            animateSVG('[data-content]', {
                attrX: 81,
                width: 76.5,
            })
            await animateSVG(
                '[data-container]',
                { attrX: 41.5, width: 39.5 },
                {
                    onPlay: () => setContainerCode(`width: 160px;`),
                },
            )
            await animateSVG(
                '[data-sidebar]',
                {
                    attrX: 43.5,
                    width: 35.5,
                    attrY: 12.5,
                    height: 83.5,
                },
                {
                    onPlay: () =>
                        setSidebarCode(`transform: translateX(0px) translateY(0px);
max-height: 100%;`),
                },
            )
        }
        async function closeLocked() {
            await animateSVG(
                '[data-sidebar]',
                {
                    attrX: 4,
                    width: 35.5,
                    attrY: 12.5,
                    height: 83.5,
                },
                {
                    onPlay: () =>
                        setSidebarCode(`transform: translateX(-160px) translateY(0px);
max-height: 100%;`),
                },
            )
            animateSVG('[data-content]', {
                attrX: 41.5,
                width: 116,
            })
            await animateSVG(
                '[data-container]',
                { attrX: 41.5, width: 1 },
                {
                    onPlay: () => setContainerCode(`width: 0px;`),
                },
            )
        }
        isOpen
            ? isLocked
                ? openLocked()
                : openUnlocked()
            : isLocked
            ? closeLocked()
            : closeUnlocked()
    }, [animate, animateSVG, isLocked, isOpen])

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
                    {/* <pattern
                        id="pattern"
                        patternUnits="userSpaceOnUse"
                        width="7.5"
                        height="7.5"
                        // patternTransform="rotate(45)"
                    >
                       <line
                            x1="0"
                            y="0"
                            x2="0"
                            y2="7.5"
                            stroke="#000000"
                            strokeWidth="2"
                        />
                    
                    </pattern> */}
                    <pattern
                        id="pattern"
                        patternUnits="userSpaceOnUse"
                        width="5"
                        height="5"
                    >
                        <circle
                            className="fill-slate-200"
                            cx="3.75"
                            cy="3.75"
                            r=".75"
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
                    x={41}
                    fill="white"
                    y={1}
                    width="17.5"
                    height="9"
                    className="stroke-slate-200"
                />
                <text
                    x={41}
                    y={1.5}
                    width="40"
                    height="40"
                    className="absolute translate-x-[2px] translate-y-[5px] top-0 leading-none text-[5px]  font-bold text-slate-200 fill-current"
                >
                    page
                </text>

                <rect
                    data-container
                    stroke="black"
                    fill="white"
                    x={41.5}
                    width={39.5}
                    y={2}
                    height={96}
                />
                <text
                    data-container
                    x={41.5}
                    y={1.5}
                    width="100"
                    height={96}
                    className="absolute translate-x-[2px] translate-y-[6px] top-0 leading-none text-[5px]  font-bold text-black"
                >
                    container
                </text>

                <rect
                    data-content
                    stroke="black"
                    fill="white"
                    x={81}
                    width={76.5}
                    y={2}
                    height={96}
                />
                <text
                    data-content
                    x={81}
                    y={1.5}
                    width="100"
                    height="20"
                    className="absolute translate-x-[2px] translate-y-[6px] top-0 leading-none text-[5px] font-bold text-black"
                >
                    content
                </text>

                <rect
                    data-sidebar
                    stroke="white"
                    fill="transparent"
                    x={43.5}
                    width={35.5}
                    y={12.5}
                    height={83.5}
                />
                <rect
                    data-sidebar
                    stroke="black"
                    strokeDasharray={'3 2'}
                    fill="white"
                    x={43.5}
                    width={35.5}
                    y={12.5}
                    height={83.5}
                />

                <text
                    data-sidebar
                    x={43.5}
                    width={35.5}
                    y={12.5}
                    height={83.5}
                    className="absolute translate-x-[2px] translate-y-[6px] top-0 leading-none text-[5px]  font-bold text-black"
                >
                    sidebar
                </text>
            </svg>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-5">
                <button
                    className="col-span-3 text-lg font-bold border-4 border-black px-3 py-0.5"
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    {isOpen ? 'close' : 'open'} sidebar
                </button>

                <button
                    className="col-span-3 text-lg font-bold border-4 border-black px-3 py-0.5"
                    onClick={() => setIsLocked(prev => !prev)}
                >
                    {isLocked ? 'unlock' : 'lock'} sidebar
                </button>
                <div className="col-span-3 sm:col-span-4">
                    <div className="text-black font-bold text-lg border-black border-4 p-1">
                        sidebar
                    </div>
                    <pre>
                        <code>
                            <div>position: absolute;</div>
                            <div>width: 160px;</div>
                            <div>{sidebarCode}</div>
                        </code>
                    </pre>
                </div>
                <div className="col-span-3 sm:col-span-2">
                    <div className="text-black font-bold text-lg border-black border-4 p-1">
                        container
                    </div>
                    <pre>
                        <code>
                            <div>{containerCode}</div>
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    )
}
