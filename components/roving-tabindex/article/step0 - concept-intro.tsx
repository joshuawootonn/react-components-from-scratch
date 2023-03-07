import { useState } from 'react'

export function MyComponent() {
    return (
        <div className="space-x-5">
            <button>button 1</button>
            <button>button 2</button>
            <button>button 3</button>
        </div>
    )
}

export function RadioComponent() {
    const [value, setValue] = useState<string | null>('banana')
    return (
        <div className="p-4 space-y-4">
            <button>interactive element</button>
            <fieldset className="border-2 p-2 m-2 border-black">
                <legend className="bg-black py-1 px-3 text-white">
                    Select your favorite fruit:
                </legend>

                <div className="space-x-2">
                    <input
                        type="radio"
                        id="strawberry"
                        name="drone"
                        value="strawberry"
                        onChange={() => setValue('strawberry')}
                        checked={value === 'strawberry'}
                    />
                    <label htmlFor="strawberry">Strawberry</label>
                </div>

                <div className="space-x-2">
                    <input
                        type="radio"
                        id="banana"
                        name="drone"
                        value="banana"
                        onChange={() => setValue('banana')}
                        checked={value === 'banana'}
                    />
                    <label htmlFor="banana">Banana</label>
                </div>

                <div className="space-x-2">
                    <input
                        type="radio"
                        id="huey"
                        name="drone"
                        value="apple"
                        onChange={() => setValue('apple')}
                        checked={value === 'apple'}
                    />
                    <label htmlFor="apple">Apple</label>
                </div>
            </fieldset>
            <button>interactive element</button>
        </div>
    )
}
