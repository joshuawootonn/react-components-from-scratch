import * as Popover from '@radix-ui/react-popover'
import { ComponentProps } from 'react'
import { PopoverClose } from './popover-close'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

function Label(props: ComponentProps<'label'>) {
    return <label className="text-[13px] text-black w-20" {...props} />
}

function Input(props: ComponentProps<'input'>) {
    return (
        <input
            className="inline-flex items-center w-20 justify-center flex-1 px-2.5 py-1 text-[13px] leading-none text-black border-2 border-black outline-none focus:rounded-0"
            {...props}
        />
    )
}

export function SubDropdownMenuContent(props: Popover.PopoverContentProps) {
    return (
        <DropdownMenu.Portal>
            <DropdownMenu.SubContent {...props} asChild>
                <div className="border-black border-2 bg-white p-5 flex flex-col gap-2.5">
                    <p className=" text-[15px] leading-[19px] font-medium mb-2.5">
                        Custom
                    </p>
                    <fieldset className="flex gap-2 items-center">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="Name" />
                    </fieldset>
                    <fieldset className="flex gap-2 items-center">
                        <Label htmlFor="width">Width</Label>
                        <Input id="width" defaultValue="3in" />
                    </fieldset>
                    <fieldset className="flex gap-2 items-center">
                        <Label htmlFor="height">Height</Label>
                        <Input id="height" defaultValue="7in" />
                    </fieldset>
                    <fieldset className="flex gap-2 items-center">
                        <Label htmlFor="color">Color</Label>
                        <Input id="color" defaultValue="Purple" />
                    </fieldset>
                    <PopoverClose />
                </div>
            </DropdownMenu.SubContent>
        </DropdownMenu.Portal>
    )
}
