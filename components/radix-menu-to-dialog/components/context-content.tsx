import * as ContextMenu from '@radix-ui/react-context-menu'
import * as Popover from '@radix-ui/react-popover'
import { forwardRef } from 'react'

const Item = forwardRef(function Item(
    props: ContextMenu.ContextMenuItemProps,
    ref: React.Ref<HTMLDivElement>,
) {
    return (
        <ContextMenu.Item
            ref={ref}
            className="group text-[13px] leading-none text-black flex items-center px-3 py-2 relative select-none outline-none hover:text-white hover:bg-black focus:text-white focus:bg-black"
            {...props}
        />
    )
})

export function ContextContent(props: ContextMenu.ContextMenuContentProps) {
    return (
        <ContextMenu.ContextMenuPortal>
            <ContextMenu.Content {...props}>
                <Item>
                    Circle
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="ml-auto h-3 w-3 shrink-0 fill-black group-hover:fill-white group-focus:fill-white"
                    >
                        <circle cx="12" cy="12" r="10" />
                    </svg>
                </Item>
                <Item>
                    Triangle
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="ml-auto h-3 w-3 rotate-90  fill-black group-hover:fill-white group-focus:fill-white"
                    >
                        <path d="m12 2l-10 20h20l-10 -20" />
                    </svg>
                </Item>
                <Item>
                    Square
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="ml-auto h-3 w-3 shrink-0 fill-black group-hover:fill-white group-focus:fill-white"
                    >
                        <path d="m2 2h20v20h-20v-20" />
                    </svg>
                </Item>
                <Popover.Trigger asChild>
                    <Item>Custom</Item>
                </Popover.Trigger>
                {/* <DropdownMenu.Sub> */}
                {/*   <DropdownMenu.DropdownMenuSubTrigger className="group text-[13px] leading-none text-black flex items-center px-3 py-2 relative select-none outline-none hover:text-white hover:bg-black focus:text-white focus:bg-black"> */}
                {/*     Custom */}
                {/*   </DropdownMenu.DropdownMenuSubTrigger> */}
                {/**/}
                {/*   <SubDropdownMenuContent /> */}
                {/* </DropdownMenu.Sub> */}
            </ContextMenu.Content>
        </ContextMenu.ContextMenuPortal>
    )
}
