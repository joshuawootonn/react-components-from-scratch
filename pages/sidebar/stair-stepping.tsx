import clsx from 'clsx'
import { useState } from 'react'

function App() {
    const [isTRBL, setIsTRBL] = useState(false)
    const [isTranslate, setIsTranslate] = useState(false)

    return (
        <div className="m-3 space-y-4">
            <h1 className="text-xl font-bold">Stair stepping demo</h1>
            <p>
                Notice the top/left example jumps between pixels, while the
                translate smoothly transitions between them.
            </p>
            <div className="space-x-2 flex justify-start items-start">
                <button
                    className="px-2 py-1 border-black border-2"
                    onClick={() => setIsTRBL(count => !count)}
                >
                    Toggle top/left
                </button>
                <button
                    className="px-2 py-1 border-black border-2"
                    onClick={() => setIsTranslate(count => !count)}
                >
                    Toggle translate
                </button>
            </div>
            <div className="h-[250px] relative z-0">
                <div
                    className={clsx(
                        'bg-black text-white absolute w-[100px] h-[100px] transition-all duration-[3000ms] ease-linear',
                        isTRBL ? 'left-[100px] top-[3px]' : 'left-0 top-0',
                    )}
                >
                    top/left
                </div>
                <div
                    className={clsx(
                        'bg-black text-white absolute top-[110px] left-0 w-[100px] h-[100px] transition-all duration-[3000ms] ease-linear',
                        isTranslate
                            ? 'translate-x-[100px] translate-y-[3px]'
                            : 'translate-x-0 translate-y-0',
                    )}
                >
                    translate
                </div>
            </div>
        </div>
    )
}

export default App
