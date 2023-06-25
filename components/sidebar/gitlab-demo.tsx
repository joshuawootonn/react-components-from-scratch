import { useAnimate, DOMKeyframesDefinition, Transition } from 'framer-motion'
import { useState, useEffect } from 'react'

export function GitlabDemo() {
    const [isOpen, setIsOpen] = useState(false)
    const [ref, animate] = useAnimate()
    const [sidebarCode, setSidebarCode] = useState('')
    const [contentCode, setContentCode] = useState('')

    useEffect(() => {
        async function open() {
            await animate(
                '[data-content]',
                {
                    attrX: 81,
                    width: 76.5,
                } as DOMKeyframesDefinition,
                {
                    ease: [0.165, 0.84, 0.44, 1],
                    duration: 0.3,
                    onPlay: () => setContentCode(`padding-left: 160px;`),
                },
            )
            await animate(
                '[data-sidebar]',
                { attrX: 41.5 } as DOMKeyframesDefinition,
                {
                    onPlay: () => setSidebarCode(`transform: translateX(0%);`),
                    ease: [0.165, 0.84, 0.44, 1],
                    duration: 0.3,
                },
            )
        }
        async function close() {
            await animate(
                '[data-sidebar]',
                {
                    attrX: 2,
                } as DOMKeyframesDefinition,
                {
                    onPlay: () =>
                        setSidebarCode(`transform: translateX(-100%);`),
                    ease: [0.165, 0.84, 0.44, 1],
                    duration: 0.3,
                },
            )
            await animate(
                '[data-content]',
                {
                    attrX: 41.5,
                    width: 116.5,
                } as DOMKeyframesDefinition,
                {
                    onPlay: () => setContentCode(`padding-left: 0px;`),
                    ease: [0.165, 0.84, 0.44, 1],
                    duration: 0.3,
                },
            )
        }
        isOpen ? open() : close()
    }, [animate, isOpen])

    return (
        <div className="prose-pre:rounded-none prose-pre:bg-black prose-pre:mt-0">
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
                            stroke-width="2"
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
                    x={1}
                    width={158}
                    y={1}
                    height={98}
                ></rect>
                <foreignObject x={1.5} y={1.5} width="40" height="40">
                    <div className="absolute top-0 leading-none text-[5px] p-[1px] font-bold text-slate-200 border-slate-200 bg-white border-r-[1px] border-b-[1px]">
                        page
                    </div>
                </foreignObject>
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

                <foreignObject data-sidebar x={2} y="2" width="100" height="20">
                    <div className="absolute top-0 leading-none text-[5px] p-[1px] pl-0.5 pt-0.5 font-bold text-black border-dashed border-black border-b-[1px] border-r-[1px]">
                        sidebar
                    </div>
                </foreignObject>

                <rect
                    data-content
                    stroke="black"
                    fill="white"
                    x={41.5}
                    width={116.5}
                    y={2}
                    height={96}
                />
                <foreignObject
                    data-content
                    x={41.5}
                    y="2"
                    width="100"
                    height="20"
                >
                    <div className="absolute top-0 leading-none text-[5px] p-[1px] pl-0.5 pt-0.5 font-bold text-black border-black border-b-[1px] border-r-[1px]">
                        content
                    </div>
                </foreignObject>
            </svg>
            <div className="grid grid-cols-2 gap-5">
                <div>
                    <div className="text-black translate-y-1 font-bold text-lg border-black border-4 p-1">
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
                    <div className="text-black translate-y-1 font-bold text-lg border-black border-4 p-1">
                        content
                    </div>
                    <pre>
                        <code>
                            <div>{contentCode}</div>
                        </code>
                    </pre>
                </div>
            </div>

            <button
                className="border-2 border-black px-3 py-1"
                onClick={() => setIsOpen(prev => !prev)}
            >
                toggle
            </button>
        </div>
    )
}
