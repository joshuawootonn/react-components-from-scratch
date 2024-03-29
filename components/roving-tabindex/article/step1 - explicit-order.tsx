import isHotkey from 'is-hotkey'
import { useState, useRef, KeyboardEvent } from 'react'

export function ButtonGroup() {
    const [focusableId, setFocusableId] = useState('button 1')
    const [options] = useState(['button 1', 'button 2', 'button 3'])
    const elements = useRef(new Map<string, HTMLElement>())

    return (
        <div className="space-x-5">
            {options.map((button, key) => (
                <button
                    key={key}
                    className="border-2 border-black px-2 pt-0.5 focus:outline-dashed focus:outline-offset-4 focus:outline-2 focus:outline-black"
                    onKeyDown={(e: KeyboardEvent) => {
                        if (isHotkey('right', e)) {
                            const currentIndex = options.findIndex(
                                text => text === button,
                            )
                            const nextIndex =
                                currentIndex === options.length - 1
                                    ? 0
                                    : currentIndex + 1

                            const nextOption = options.at(nextIndex)
                            if (nextOption) {
                                elements.current.get(nextOption)?.focus()
                                setFocusableId(nextOption)
                            }
                        }
                    }}
                    tabIndex={button === focusableId ? 0 : -1}
                    ref={element => {
                        if (element) {
                            elements.current.set(button, element)
                        } else {
                            elements.current.delete(button)
                        }
                    }}
                >
                    {button}
                </button>
            ))}
        </div>
    )
}
