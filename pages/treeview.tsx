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
import { TreeviewARIA } from 'components/treeview/article/part-2/step8 - aria'
import { TreeviewArrow } from 'components/treeview/article/part-3/animatedTreeview'
import { demoInitialValues } from 'lib/treeview'

export default function TreeviewPage() {
    const [selected, select] = useState<string | null>(null)
    return (
        <div className="max-w-5xl p-4 lg:p-8 mx-auto prose prose-headings:font-700 ">
            <div className="flex flex-row justify-between items-start">
                <h1 className="font-sans">Treeview (wip)</h1>
                <Link href="/">Back to the full list of components</Link>
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
                {demoInitialValues.map(node => (
                    <TreeviewStructure.Node node={node} key={node.id} />
                ))}
            </TreeviewStructure.Root>
            <p>Open</p>
            <TreeviewOpen.Root className="w-[300px] h-[400px] not-prose">
                {demoInitialValues.map(node => (
                    <TreeviewOpen.Node node={node} key={node.id} />
                ))}
            </TreeviewOpen.Root>
            <p>Open state indicator</p>
            <TreeviewOpenIndicator.Root className="w-[300px] h-[400px] not-prose">
                {demoInitialValues.map(node => (
                    <TreeviewOpenIndicator.Node node={node} key={node.id} />
                ))}
            </TreeviewOpenIndicator.Root>
            <p>Selection</p>
            <TreeviewSelection.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {demoInitialValues.map(node => (
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
                {demoInitialValues.map(node => (
                    <TreeviewRovingTabindex.Node node={node} key={node.id} />
                ))}
            </TreeviewRovingTabindex.Root>
            <p>Up / Down keybindings</p>
            <TreeviewUpDown.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {demoInitialValues.map(node => (
                    <TreeviewUpDown.Node node={node} key={node.id} />
                ))}
            </TreeviewUpDown.Root>
            <p>Right and Left keybindings</p>
            <TreeviewRightLeft.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {demoInitialValues.map(node => (
                    <TreeviewRightLeft.Node node={node} key={node.id} />
                ))}
            </TreeviewRightLeft.Root>
            <p>Updated focus styles</p>
            <TreeviewStyle.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {demoInitialValues.map(node => (
                    <TreeviewStyle.Node node={node} key={node.id} />
                ))}
            </TreeviewStyle.Root>
            <p>Home and end keybindings</p>
            <TreeviewHomeEnd.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {demoInitialValues.map(node => (
                    <TreeviewHomeEnd.Node node={node} key={node.id} />
                ))}
            </TreeviewHomeEnd.Root>
            <p>Typeahead</p>
            <TreeviewTypeahead.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {demoInitialValues.map(node => (
                    <TreeviewTypeahead.Node node={node} key={node.id} />
                ))}
            </TreeviewTypeahead.Root>
            <p>Selection</p>
            <TreeviewSelection.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {demoInitialValues.map(node => (
                    <TreeviewSelection.Node node={node} key={node.id} />
                ))}
            </TreeviewSelection.Root>
            <p>ARIA</p>
            <TreeviewARIA.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
                label="File Explorer"
            >
                {demoInitialValues.map(node => (
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
                {demoInitialValues.map(node => (
                    <TreeviewArrow.Node node={node} key={node.id} />
                ))}
            </TreeviewArrow.Root>
        </div>
    )
}
