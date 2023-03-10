import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'

import { RovingTabindexRoot, useRovingTabindex } from 'components/roving-tabindex'

import { ToggleGroup } from '../components/toggle-group/toggle-group'

export default function ToolbarPage() {
    const [textAlignment, setTextAlignment] = useState<string | null>(null)
    const [favoriteFruit, changeFavoriteFruit] = useState<string | null>('two')

    const [active, setActive] = useState(null)

    return (
        <div className="max-w-5xl p-4 lg:p-8 mx-auto prose prose-headings:font-700 ">
            <div className="flex flex-row justify-between items-start">
                <h1 className="font-sans">Toolbar(wip)</h1>
                <Link href="/">Back to the full list of components</Link>
            </div>

            <RovingTabindexRoot as={'div'} active={active}>
                <RovingButton id="1" />
                <RovingButton id="2" />
                <RovingButton id="3" />
                <ToggleGroupWrapper />
                <RovingButton id="4" />
            </RovingTabindexRoot>
        </div>
    )
}

function ToggleGroupWrapper() {
    const [favoriteFruit, changeFavoriteFruit] = useState<string | null>('two')
    const { getOrderedItems, getRovingProps, isFocusable } = useRovingTabindex('tabindex')
    return (
        <ToggleGroup.Root
            value={favoriteFruit}
            onChange={changeFavoriteFruit}
            aria-label="What is your favorite fruit?"
            {...getRovingProps()}
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
    )
}

function RovingButton(props: { id: string }) {
    const { getOrderedItems, getRovingProps, isFocusable } = useRovingTabindex(props.id)
    return (
        <button
            className={clsx('border-2', isFocusable ? 'border-pink' : 'border-transparent')}
            {...getRovingProps()}
        >
            button
        </button>
    )
}
