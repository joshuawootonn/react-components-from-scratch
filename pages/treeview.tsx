import Link from 'next/link'
import { useState } from 'react'

import { TreeviewStructure } from 'components/treeview/article/part-1/step1 - structure'
import { TreeviewOpen } from 'components/treeview/article/part-1/step2 - open'
import { TreeviewOpenIndicator } from 'components/treeview/article/part-1/step3 - open-indicator'
import { TreeviewSelection } from 'components/treeview/article/part-1/step4 - selection'
import { TreeviewRovingTabindex } from 'components/treeview/article/part-2/step1 - adding-roving-tabindex'
import { TreeviewUpDown } from 'components/treeview/article/part-2/step2 - up-down'
import { TreeviewRightLeft } from 'components/treeview/article/part-2/step3 - right-left'
import { TreeviewStyle } from 'components/treeview/article/part-2/step4 - style'
import { TreeviewHomeEnd } from 'components/treeview/article/part-2/step5 - home-end'
import { TreeviewTypeahead } from 'components/treeview/article/part-2/step6 - typeahead'
import { TreeviewKeyboardSelection } from 'components/treeview/article/part-2/step7 - selection'
import { TreeviewARIA } from 'components/treeview/article/part-2/step8 - aria'
import { TreeviewArrow } from 'components/treeview/article/part-3/animatedTreeview'
import {
    demoInitialValues,
    longInitialValues,
    nextprojectInitialValues,
} from 'lib/treeview'

export default function TreeviewPage() {
    const [selected, select] = useState<string | null>(null)
    return (
        <div className="max-w-2xl p-4 lg:p-8 mx-auto prose prose-headings:font-700 ">
            <div className="flex flex-row justify-between items-start">
                <h1 className="font-sans">Treeview</h1>
                <div className="flex space-x-4">
                    <Link href="https://github.com/joshuawootonn/react-components-from-scratch/blob/main/pages/treeview.tsx">
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
                                fill="#24292f"
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
                This page is the demo for a series on how to create a treeview
                in react.
            </p>
            <ul>
                <li>
                    <a href="https://www.joshuawootonn.com/react-treeview-component">
                        Part 1
                    </a>{' '}
                    covers mouse interativity.
                </li>
                <li>
                    <a href="https://www.joshuawootonn.com/react-treeview-component-part-2">
                        Part 2
                    </a>{' '}
                    covers keyboard navigation and accessibility.
                </li>
                <li>
                    <a href="https://www.joshuawootonn.com/react-treeview-component-part-3">
                        Part 3 (Bonus)
                    </a>{' '}
                    adds animations
                </li>
            </ul>
            <h2>Part 1</h2>
            <p>Structure</p>
            <TreeviewStructure.Root className="w-[300px] h-[400px]  not-prose ">
                {nextprojectInitialValues.map(node => (
                    <TreeviewStructure.Node node={node} key={node.id} />
                ))}
            </TreeviewStructure.Root>
            <p>Open</p>
            <TreeviewOpen.Root className="w-[300px] h-[400px] not-prose">
                {nextprojectInitialValues.map(node => (
                    <TreeviewOpen.Node node={node} key={node.id} />
                ))}
            </TreeviewOpen.Root>
            <p>Open state indicator</p>
            <TreeviewOpenIndicator.Root className="w-[300px] h-[400px] not-prose">
                {nextprojectInitialValues.map(node => (
                    <TreeviewOpenIndicator.Node node={node} key={node.id} />
                ))}
            </TreeviewOpenIndicator.Root>
            <p>Selection</p>
            <TreeviewSelection.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {nextprojectInitialValues.map(node => (
                    <TreeviewSelection.Node node={node} key={node.id} />
                ))}
            </TreeviewSelection.Root>
            <h2>Part 2</h2>
            <p>Adding Roving tabindex</p>
            <TreeviewRovingTabindex.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {nextprojectInitialValues.map(node => (
                    <TreeviewRovingTabindex.Node node={node} key={node.id} />
                ))}
            </TreeviewRovingTabindex.Root>
            <p>Up / Down keybindings</p>
            <TreeviewUpDown.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {nextprojectInitialValues.map(node => (
                    <TreeviewUpDown.Node node={node} key={node.id} />
                ))}
            </TreeviewUpDown.Root>
            <p>Right and Left keybindings</p>
            <TreeviewRightLeft.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {nextprojectInitialValues.map(node => (
                    <TreeviewRightLeft.Node node={node} key={node.id} />
                ))}
            </TreeviewRightLeft.Root>
            <p>Updated focus styles</p>
            <TreeviewStyle.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {nextprojectInitialValues.map(node => (
                    <TreeviewStyle.Node node={node} key={node.id} />
                ))}
            </TreeviewStyle.Root>
            <p>Home and end keybindings</p>
            <TreeviewHomeEnd.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {nextprojectInitialValues.map(node => (
                    <TreeviewHomeEnd.Node node={node} key={node.id} />
                ))}
            </TreeviewHomeEnd.Root>
            <p>Typeahead</p>
            <TreeviewTypeahead.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {nextprojectInitialValues.map(node => (
                    <TreeviewTypeahead.Node node={node} key={node.id} />
                ))}
            </TreeviewTypeahead.Root>
            <p>Selection</p>
            <TreeviewKeyboardSelection.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {nextprojectInitialValues.map(node => (
                    <TreeviewKeyboardSelection.Node node={node} key={node.id} />
                ))}
            </TreeviewKeyboardSelection.Root>
            <p>ARIA</p>
            <TreeviewARIA.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
                label="File Explorer"
            >
                {nextprojectInitialValues.map(node => (
                    <TreeviewARIA.Node node={node} key={node.id} />
                ))}
            </TreeviewARIA.Root>
            <h2>Part 3: Animation</h2>
            <TreeviewArrow.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
                label="File Explorer"
            >
                {nextprojectInitialValues.map(node => (
                    <TreeviewArrow.Node node={node} key={node.id} />
                ))}
            </TreeviewArrow.Root>
            <hr />
            <h2 id="large-dataset">Large dataset</h2>
            <TreeviewArrow.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
                label="File Explorer"
            >
                {longInitialValues.map(node => (
                    <TreeviewArrow.Node node={node} key={node.id} />
                ))}
            </TreeviewArrow.Root>
            <div className="h-64" />
        </div>
    )
}
