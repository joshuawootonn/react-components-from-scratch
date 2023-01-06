import { Bars3BottomLeftIcon, Bars3BottomRightIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { useState } from 'react'

import { ToggleGroup, ToggleGroupButton } from '../components/toggle-group'

export default function ToggleGroupPage() {
    const [textAlignment, setTextAlignment] = useState<string | null>(null)
    const [currentOption, setOption] = useState<string | null>('two')

    return (
        <div className="max-w-5xl p-4 lg:p-8 mx-auto prose prose-headings:font-700">
            <h1 className="font-sans">Toggle Group</h1>

            <h2>Icon exmaple</h2>
            <ToggleGroup
                value={textAlignment}
                onChange={setTextAlignment}
                aria-label="Text Alignment"
            >
                <ToggleGroupButton value="left" aria-label="Left Align">
                    <Bars3BottomLeftIcon className="h-5 w-5" />
                </ToggleGroupButton>
                <ToggleGroupButton value="center" aria-label="Center Align">
                    <Bars3Icon className="h-5 w-5" />
                </ToggleGroupButton>
                <ToggleGroupButton value="right" aria-label="Right Align">
                    <Bars3BottomRightIcon className="h-5 w-5" />
                </ToggleGroupButton>
            </ToggleGroup>
            <h2>Text example w/ default value</h2>
            <ToggleGroup value={currentOption} onChange={setOption} aria-label="Option selector">
                <ToggleGroupButton value="one" className="px-3">
                    Option 1
                </ToggleGroupButton>
                <ToggleGroupButton value="two" className="px-3">
                    Option 2
                </ToggleGroupButton>
                <ToggleGroupButton value="three" className="px-3">
                    Option 3
                </ToggleGroupButton>
            </ToggleGroup>
        </div>
    )
}
