'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as ContextMenu from '@radix-ui/react-context-menu'
import * as Popover from '@radix-ui/react-popover'
import { clsx } from 'clsx'
import { DropdownMenuTrigger } from 'components/radix-menu-to-dialog/components/dropdown-trigger'
import { ContextContent } from 'components/radix-menu-to-dialog/components/context-content'
import { PopoverContent } from 'components/radix-menu-to-dialog/components/popover-content'
import { useRef, useState } from 'react'
import { DropdownContentInteractiveSubContent } from './components/dropdown-content-with-sub-content'

export function RadixMenuToSubmenu() {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [position, setPosition] = useState<DOMRect | null>(null)
    return (
        <Popover.Root>
            {position && (
                <Popover.PopoverAnchor
                    virtualRef={{
                        current: {
                            getBoundingClientRect: () => position,
                        },
                    }}
                />
            )}
            <ContextMenu.Root modal={false}>
                <ContextMenu.Trigger
                    onContextMenu={e =>
                        setPosition(new DOMRect(e.clientX + 2, e.clientY, 0, 0))
                    }
                >
                    <Popover.Root>
                        <DropdownMenu.Root modal={false}>
                            <div className="w-52 h-52 border-2 border-black flex justify-end items-start">
                                <Popover.PopoverAnchor>
                                    <DropdownMenuTrigger ref={buttonRef} />
                                </Popover.PopoverAnchor>
                                <PopoverContent
                                    sideOffset={5}
                                    align={'center'}
                                    className={clsx(
                                        'p-5 w-52 bg-white border-2 border-black',
                                    )}
                                    onCloseAutoFocus={e => {
                                        e.preventDefault()
                                        buttonRef.current?.focus()
                                    }}
                                />
                                <DropdownContentInteractiveSubContent
                                    sideOffset={5}
                                    className="bg-white border-2 border-black w-28"
                                />
                            </div>
                        </DropdownMenu.Root>
                    </Popover.Root>
                </ContextMenu.Trigger>
                <ContextContent className="w-28 bg-white border-2 border-black" />
                <PopoverContent
                    sideOffset={0}
                    align={'start'}
                    className={clsx('p-5 w-52 bg-white border-2 border-black')}
                />
            </ContextMenu.Root>
        </Popover.Root>
    )
}
