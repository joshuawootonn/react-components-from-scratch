import { Bars3BottomLeftIcon, Bars3BottomRightIcon, Bars3Icon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState } from 'react'

import { ToggleGroup } from '../components/toggle-group/toggle-group'

export default function ToggleGroupPage() {
    const [textAlignment, setTextAlignment] = useState<string | null>(null)
    const [favoriteFruit, changeFavoriteFruit] = useState<string | null>('two')

    return (
        <div className="max-w-5xl p-4 lg:p-8 mx-auto prose prose-headings:font-700 ">
            <div className="flex flex-row justify-between items-start">
                <h1 className="font-sans">Toggle Group</h1>
                <Link href="/">Back to the full list of components</Link>
            </div>

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
                aria-label="What is your favorite fruit?"
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

            <h2>Radio group for comparison</h2>

            <fieldset className="flex flex-row items-center space-x-2">
                <div className="flex justify-center space-x-1">
                    <input type="radio" id="strawberry" name="drone" value="strawberry" checked />
                    <label for="strawberry">Strawberry 🍓</label>
                </div>
                <div className="flex justify-center space-x-1">
                    <input type="radio" id="banana" name="drone" value="banana" checked />
                    <label for="banana">Banana 🍌</label>
                </div>
                <div className="flex justify-center space-x-1">
                    <input type="radio" id="apple" name="drone" value="apple" checked />
                    <label for="apple">Apple 🍏</label>
                </div>
            </fieldset>

            {/* <div className="not-prose ml-28 mt-10 mb-20 flex flex-col justify-center w-[400px] space-y-10 items-center">
                <button className="text-purple px-2 py-1 rounded-md">focusable element</button>
                <div className="space-y-4 text-center">
                    <h1 className="text-xl font-bold">Toggle Group without roving tabindex</h1>

                    <ToggleGroup.Root
                        value={favoriteFruit}
                        onChange={changeFavoriteFruit}
                        aria-label="What is your favorite fruit?"
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
                </div>
                <button className="mt-12 text-purple px-2 py-1 rounded-md">
                    focusable element
                </button>
            </div> */}

            {/* <div className="not-prose mt-10 mb-20 flex flex-col justify-center w-[400px] space-y-10 items-center">
                <button className=" text-purple px-2 py-1 rounded-md">focusable element</button>
                <div className="space-y-4 text-center">
                    <h2 className="text-xl font-bold">Radio group for comparison</h2>

                    <fieldset className="flex flex-row items-center space-x-2">
                        <div className="flex justify-center space-x-1">
                            <input
                                type="radio"
                                id="strawberry"
                                name="drone"
                                value="strawberry"
                                checked
                            />
                            <label for="strawberry">Strawberry 🍓</label>
                        </div>
                        <div className="flex justify-center space-x-1">
                            <input type="radio" id="banana" name="drone" value="banana" checked />
                            <label for="banana">Banana 🍌</label>
                        </div>
                        <div className="flex justify-center space-x-1">
                            <input type="radio" id="apple" name="drone" value="apple" checked />
                            <label for="apple">Apple 🍏</label>
                        </div>
                    </fieldset>
                </div>
                <button className="mt-12 text-purple px-2 py-1 rounded-md">
                    focusable element
                </button>
            </div>

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
            </ToggleGroup.Root> */}
        </div>
    )
}
