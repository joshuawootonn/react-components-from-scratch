import { Bars3BottomLeftIcon, Bars3BottomRightIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { useState } from 'react'

import { ToggleGroup } from '../components/toggle-group'
import { ToggleGroup as ToggleGroupV2 } from '../components/toggle-groupv2'

export default function ToggleGroupPage() {
    const [textAlignment, setTextAlignment] = useState<string | null>(null)
    const [favoriteFruit, changeFavoriteFruit] = useState<string | null>('two')

    return (
        <div className="max-w-5xl p-4 lg:p-8 mx-auto prose prose-headings:font-700">
            <h1 className="font-sans">Toggle Group</h1>

            <h2>Text Alignment</h2>
            <ToggleGroup.Root
                value={textAlignment}
                onChange={setTextAlignment}
                aria-label="Text Alignment"
            >
                <ToggleGroup.Button value="left" aria-label="Left Align">
                    <Bars3BottomLeftIcon className="h-5 w-5" />
                </ToggleGroup.Button>
                <ToggleGroup.Button value="center" aria-label="Center Align">
                    <Bars3Icon className="h-5 w-5" />
                </ToggleGroup.Button>
                <ToggleGroup.Button value="right" aria-label="Right Align">
                    <Bars3BottomRightIcon className="h-5 w-5" />
                </ToggleGroup.Button>
            </ToggleGroup.Root>
            <h2>What is your favorite fruit?</h2>
            <ToggleGroup.Root
                value={favoriteFruit}
                onChange={changeFavoriteFruit}
                aria-label="What is your favorite?"
            >
                <ToggleGroup.Button value="one" className="px-2">
                    Strawberry 🍓
                </ToggleGroup.Button>
                <ToggleGroup.Button value="two" className="px-2">
                    Banana 🍌
                </ToggleGroup.Button>
                <ToggleGroup.Button value="three" className="px-2">
                    Apple 🍏
                </ToggleGroup.Button>
            </ToggleGroup.Root>
{/* 
            <h2>What is your favorite fruit? v2</h2>

            <ToggleGroupV2.Root
                value={favoriteFruit}
                onChange={changeFavoriteFruit}
                aria-label="What is your favorite?"
            >
                <ToggleGroupV2.Button value="one" className="px-2">
                    Strawberry 🍓
                </ToggleGroupV2.Button>
                <ToggleGroupV2.Button value="two" className="px-2">
                    Banana 🍌
                </ToggleGroupV2.Button>
                <ToggleGroupV2.Button value="three" className="px-2">
                    Apple 🍏
                </ToggleGroupV2.Button>
            </ToggleGroupV2.Root> */}
        </div>
    )
}
