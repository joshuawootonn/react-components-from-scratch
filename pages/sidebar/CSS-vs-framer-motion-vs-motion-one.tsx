import clsx from 'clsx'
import { motion } from 'framer-motion'
import { animate } from 'motion'
import { useEffect, useState } from 'react'

import { PerfSlayer } from 'components/sidebar/perf-slayer'

function App() {
    const [renderPerfSlayer, togglePerfSlayer] = useState(true)
    const [isCSSOpen, setIsCSSOpen] = useState(false)
    const [isFramerMotionOpen, setIsFramerMotionOpen] = useState(false)
    const [isMotionOneOpen, setIsMotionOneOpen] = useState(false)

    useEffect(() => {
        animate(
            '[data-motion-one-box]',
            {
                transform: isMotionOneOpen
                    ? 'translateX(200px)'
                    : 'translateX(0px)',
            },
            {
                duration: 0.15,
                easing: 'ease-in-out',
            },
        )
    }, [isMotionOneOpen])

    return (
        <div className="m-3 space-y-4">
            <h1 className="text-xl font-bold">
                CSS transition vs requestAnimationFrame (Framer Motion) vs WAAPI
                (Motion One)
            </h1>
            <div className="grid gap-2 md:grid-cols-4 grid-cols-2">
                <button
                    className="px-2 py-1 border-black border-2"
                    onClick={() => setIsCSSOpen(count => !count)}
                >
                    Toggle CSS
                </button>
                <button
                    className="px-2 py-1 border-black border-2"
                    onClick={() => setIsFramerMotionOpen(count => !count)}
                >
                    Toggle framer-motion
                </button>
                <button
                    className="px-2 py-1 border-black border-2"
                    onClick={() => setIsMotionOneOpen(count => !count)}
                >
                    Toggle motion one
                </button>
                <button
                    className="px-2 py-1 justify-items-end border-black border-2"
                    onClick={() => togglePerfSlayer(count => !count)}
                >
                    Toggle PerfSlayer
                </button>
            </div>
            <div className="relative z-0 h-[350px]">
                <div
                    className={clsx(
                        'bg-black text-white absolute top-[0px] left-0 w-[100px] h-[100px] transition-all ease-in-out ',
                        isCSSOpen ? 'translate-x-[200px]' : 'translate-x-0 ',
                    )}
                >
                    CSS
                </div>

                <motion.div
                    className="bg-black text-white absolute top-[110px] left-0 w-[100px] h-[100px]"
                    animate={{
                        x: isFramerMotionOpen ? 200 : 0,
                    }}
                    transition={{
                        ease: 'easeInOut',
                        duration: 0.15,
                    }}
                >
                    framer-motion
                </motion.div>
                <div
                    className={
                        'bg-black text-white absolute top-[220px] left-0 w-[100px] h-[100px] transition-all ease-in-out '
                    }
                    data-motion-one-box
                >
                    motion one
                </div>
            </div>

            {renderPerfSlayer && (
                <PerfSlayer className="h-96 w-full max-w-xl mb-12" />
            )}
        </div>
    )
}

export default App
