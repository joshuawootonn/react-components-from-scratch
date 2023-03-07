import isHotkey from 'is-hotkey'
import { useState, useRef, KeyboardEvent } from 'react'

export function MyComponent() {
    const [focusable, setFocusable] = useState('button 1')
    const [options] = useState(['button 1', 'button 2', 'button 3'])
    const elements = useRef(new Map<string, HTMLElement>())

    return (
        <div className="space-x-5">
            {options.map((button, key) => (
                <button
                    key={key}
                    onKeyDown={(e: KeyboardEvent) => {
                        if (isHotkey('right', e)) {
                            const currentIndex = options.findIndex(text => text === button)
                            const nextIndex =
                                currentIndex === options.length - 1 ? 0 : currentIndex + 1

                            const nextOption = options.at(nextIndex)
                            if (nextOption) {
                                elements.current.get(nextOption)?.focus()
                                setFocusable(nextOption)
                            }
                        }
                    }}
                    tabIndex={button === focusable ? 0 : -1}
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
