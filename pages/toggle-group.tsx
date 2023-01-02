import { Bars3BottomLeftIcon, Bars3BottomRightIcon, Bars3Icon } from '@heroicons/react/24/outline'

import { ToggleGroup, ToggleGroupButton } from '../components/toggle-group'

export default function ToggleGroupPage() {
    return (
        <div className="max-w-5xl p-4 lg:p-8 mx-auto prose">
            <h1>ToggleGroup</h1>
            <ToggleGroup>
                <ToggleGroupButton>
                    <Bars3BottomLeftIcon className="h-5 w-5" />
                </ToggleGroupButton>
                <ToggleGroupButton>
                    <Bars3Icon className="h-5 w-5" />
                </ToggleGroupButton>
                <ToggleGroupButton>
                    <Bars3BottomRightIcon className="h-5 w-5" />
                </ToggleGroupButton>
            </ToggleGroup>

            <ToggleGroup>
                <ToggleGroupButton className="px-3">Option 1</ToggleGroupButton>
                <ToggleGroupButton className="px-3">Option 2</ToggleGroupButton>
                <ToggleGroupButton className="px-3">Option 3</ToggleGroupButton>
            </ToggleGroup>
        </div>
    )
}
