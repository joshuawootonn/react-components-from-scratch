import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as ContextMenu from '@radix-ui/react-context-menu'
import * as Popover from '@radix-ui/react-popover'
import { useRef, useState } from 'react'
import { clsx } from 'clsx'
import { DropdownMenuTrigger } from 'components/radix-menu-to-dialog/dropdown-trigger'
import { ContextContent } from 'components/radix-menu-to-dialog/context-content'
import { DropdownContent } from 'components/radix-menu-to-dialog/dropdown-content'
import { DropdownContentInteractiveSubContent } from 'components/radix-menu-to-dialog/dropdown-content-with-sub-content'
import { PopoverContent } from 'components/radix-menu-to-dialog/popover-content'
import Link from 'next/link'

const App = () => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [position, setPosition] = useState<DOMRect | null>(null)

    return (
        <div className="max-w-2xl p-4 lg:p-8 mx-auto prose prose-headings:font-700 font-sans">
            <div className="flex flex-row justify-between items-start">
                <h1 className="font-sans">
                    Recreating Linear&apos;s interactive dropdowns with Radix UI
                </h1>
                <div className="flex space-x-4">
                    <Link href="https://github.com/joshuawootonn/react-components-from-scratch/blob/main/pages/disclosure.tsx">
                        <svg
                            width="24.5"
                            height="24"
                            viewBox="0 0 98 96"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                            />
                        </svg>
                    </Link>
                    <Link href="/">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
            <p>
                Here is a demo of a menu and dialog composed together for a
                &quot;interactive menu&quot; experience.
            </p>
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
                        onContextMenu={e => {
                            setPosition(
                                new DOMRect(e.clientX + 2, e.clientY, 0, 0),
                            )
                        }}
                    >
                        <Popover.Root>
                            <DropdownMenu.Root modal={false}>
                                <div className="w-52 h-52 border-2 border-black flex justify-end items-start my-3">
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

                                            const isMenuFocused =
                                                document.activeElement &&
                                                document.activeElement instanceof
                                                    HTMLElement &&
                                                document.activeElement.dataset
                                                    .radixMenuContent === ''

                                            if (!isMenuFocused) {
                                                buttonRef.current?.focus()
                                            }
                                        }}
                                        onContextMenu={e => e.stopPropagation()}
                                    />
                                    <DropdownContent
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
                        className={clsx(
                            'p-5 w-52 bg-white border-2 border-black',
                        )}
                    />
                </ContextMenu.Root>
            </Popover.Root>
            <p>
                Interactive sub dropdown menus don&apos;t work in this case
                because their shortcuts conflict with text selection.
            </p>
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
                            setPosition(
                                new DOMRect(e.clientX + 2, e.clientY, 0, 0),
                            )
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
                        className={clsx(
                            'p-5 w-52 bg-white border-2 border-black',
                        )}
                    />
                </ContextMenu.Root>
            </Popover.Root>
            <p>
                This is a the companion demo to a blog post I have{' '}
                <a href="https://joshuawootonn.com/radix-interactive-dropdown">
                    here.
                </a>
            </p>
        </div>
    )
}

export default App
