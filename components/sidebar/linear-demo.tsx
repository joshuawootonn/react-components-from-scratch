import clsx from 'clsx'
import {
    useAnimate,
    DOMKeyframesDefinition,
    AnimationOptionsWithValueOverrides,
} from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

export function LinearDemo() {
    const [isOpen, setIsOpen] = useState(true)
    const [isLocked, setIsLocked] = useState(true)
    const [ref, animate] = useAnimate()
    const [sidebarCode, setSidebarCode] = useState('')
    const [spacerCode, setSpacerCode] = useState('')

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
                    attrX: 41.5,
                    height: 80,
                    attrY: 16,
                },
                {
                    onPlay: () =>
                        setSidebarCode(`top: 47px;
bottom: 0px;
left: 0px;`),
                },
            )
            animateSVG(
                '[data-content]',
                {
                    attrX: 41.5,
                    width: 116,
                },
                {},
            )
            animateSVG('[data-spacer-text]', { width: 1, opacity: 0 })
            await animateSVG(
                '[data-spacer]',
                { width: 1 },
                {
                    onPlay: () => setSpacerCode(`width: 0px;`),
                },
            )
        }
        async function closeUnlocked() {
            await animateSVG(
                '[data-sidebar]',
                {
                    attrX: 2,
                    height: 80,
                    attrY: 16,
                },
                {
                    onPlay: () =>
                        setSidebarCode(`top: 47px;
bottom: 0px;
left: -160px;`),
                },
            )
            animateSVG('[data-content]', {
                attrX: 41.5,
                width: 116,
            })
            animateSVG('[data-spacer-text]', { width: 1, opacity: 0 })
            await animateSVG(
                '[data-spacer]',
                { width: 1 },
                {
                    onPlay: () => setSpacerCode(`width: 0px;`),
                },
            )
        }
        async function openLocked() {
            animateSVG('[data-content]', {
                attrX: 81,
                width: 76.5,
            })
            animateSVG('[data-spacer-text]', { width: 39.5, opacity: 1 })
            await animateSVG(
                '[data-spacer]',
                { width: 39.5 },
                {
                    onPlay: () => setSpacerCode(`width: 160px;`),
                },
            )
            await animateSVG(
                '[data-sidebar]',
                { attrX: 41.5, height: 96, attrY: 2 },
                {
                    onPlay: () =>
                        setSidebarCode(`top: 0px;
bottom: 0px;
left: 0px;`),
                    ease: [0.165, 0.84, 0.44, 1],
                    duration: 0.3,
                },
            )
        }
        async function closeLocked() {
            await animateSVG(
                '[data-sidebar]',
                {
                    attrX: 2,
                    height: 96,
                    attrY: 2,
                },
                {
                    onPlay: () =>
                        setSidebarCode(`top: 0px;
bottom: 0px;
left: -160px;`),
                    ease: [0.165, 0.84, 0.44, 1],
                    duration: 0.3,
                },
            )
            animateSVG(
                '[data-content]',
                {
                    attrX: 41.5,
                    width: 116,
                },
                {
                    ease: [0.165, 0.84, 0.44, 1],
                    duration: 0.3,
                },
            )
            animateSVG(
                '[data-spacer-text]',
                { width: 1, opacity: 0 },
                {
                    onPlay: () => setSpacerCode(`width: 0px;`),
                    ease: [0.165, 0.84, 0.44, 1],
                    duration: 0.3,
                },
            )
            await animateSVG(
                '[data-spacer]',
                { width: 1 },
                {
                    onPlay: () => setSpacerCode(`width: 0px;`),
                    ease: [0.165, 0.84, 0.44, 1],
                    duration: 0.3,
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
                    <pattern
                        id="pattern"
                        patternUnits="userSpaceOnUse"
                        width="5"
                        height="5"
                        patternTransform="rotate(35)"
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
                    x={40.5}
                    fill="white"
                    y={1}
                    width="16.5"
                    height="9"
                    className="stroke-slate-200"
                />
                <text
                    x={40.5}
                    y={1.5}
                    width="40"
                    height="40"
                    className="absolute translate-x-[2px] translate-y-[5px]  top-0 leading-none text-[5px] font-bold text-slate-200 border-slate-200 bg-white fill-current"
                >
                    page
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
                    className="absolute translate-x-[2px] translate-y-[6px] top-0 leading-none text-[5px] fill-current font-bold text-black"
                >
                    content
                </text>

                <rect
                    data-sidebar
                    stroke="white"
                    fill="transparent"
                    x={41.5}
                    width={39.5}
                    y={2}
                    height={96}
                />
                <rect
                    data-sidebar
                    stroke="black"
                    strokeDasharray={'3 2'}
                    fill="white"
                    x={41.5}
                    width={39.5}
                    y={2}
                    height={96}
                />

                <text
                    data-sidebar
                    x={41.5}
                    y={1.5}
                    width="100"
                    height="20"
                    className="absolute translate-x-[2px] translate-y-[6px] top-0 leading-none text-[5px] font-bold text-black"
                >
                    sidebar
                </text>
                <rect
                    data-spacer
                    stroke="black"
                    fill="white"
                    x={41.5}
                    width={39.5}
                    y={45}
                    height={8.5}
                />
                <text
                    data-spacer-text
                    x={41.5}
                    y={45}
                    width="100"
                    height="20"
                    className="absolute translate-x-[2px] translate-y-[5.5px] top-0 leading-none text-[5px] font-bold text-black"
                >
                    spacer
                </text>
            </svg>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <button
                    className="col-span-1 text-lg font-bold border-4 border-black px-3 py-0.5"
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    {isOpen ? 'close' : 'open'} sidebar
                </button>

                <button
                    className="col-span-1 text-lg font-bold border-4 border-black px-3 py-0.5"
                    onClick={() => setIsLocked(prev => !prev)}
                >
                    {isLocked ? 'unlock' : 'lock'} sidebar
                </button>
                <div>
                    <div className="text-black font-bold text-lg border-black border-4 p-1">
                        sidebar
                    </div>
                    <pre>
                        <code>
                            <div>position: fixed;</div>
                            <div>width: 160px;</div>
                            <div>{sidebarCode}</div>
                        </code>
                    </pre>
                </div>
                <div>
                    <div className="text-black font-bold text-lg border-black border-4 p-1">
                        spacer
                    </div>
                    <pre>
                        <code>
                            <div>{spacerCode}</div>
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    )
}
