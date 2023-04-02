import Link from 'next/link'
import { useState } from 'react'

import { Treeview } from 'components/treeview'
import { TreeviewStructure } from 'components/treeview/article/part-1/step1 - structure'
import { TreeviewOpen } from 'components/treeview/article/part-1/step2 - open'
import { TreeviewOpenIndicator } from 'components/treeview/article/part-1/step3 - open-indicator'
import { TreeviewSelection } from 'components/treeview/article/part-1/step4 - selection'
import { TreeviewRovingTabindex } from 'components/treeview/article/part-2/step1 - adding-roving-tabindex'
import { TreeviewUpDown } from 'components/treeview/article/part-2/step2 - up-down'
import { TreeviewRightLeft } from 'components/treeview/article/part-2/step3 - right-left'
import { TreeviewStyle } from 'components/treeview/article/part-2/step4 - style'
import { TreeviewWip } from 'components/treeview/article/part-2/unknown'
import { appleInitialValues, AppleTreeview } from 'components/treeview/examples'
import { initialValue, longInitialValues } from 'lib/treeview'

export default function TreeviewPage() {
    const [selected, select] = useState<string | null>(null)
    const [appleSelected, appleSelect] = useState<string | null>(null)
    const [bigSelected, bigSelect] = useState<string | null>(null)
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
                    <a href="https://www.joshuawootonn.com/react-treeview-component-part-1">
                        Part 1
                    </a>{' '}
                    covers mouse interativity.
                </li>
                <li>
                    <a href="https://www.joshuawootonn.com/react-treeview-component-part-1">
                        Part 2
                    </a>{' '}
                    covers keyboard navigation and accessibility.
                </li>
            </ul>
            <h2>Demo of the final treeview</h2>

            <Treeview.Root
                value={selected}
                onChange={select}
                label="File manager"
                className="w-[300px] h-[400px]  not-prose "
            >
                {initialValue.map(node => (
                    <Treeview.Node node={node} key={node.id} />
                ))}
            </Treeview.Root>

            <TreeviewSelection.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {initialValue.map(node => (
                    <TreeviewSelection.Node node={node} key={node.id} />
                ))}
            </TreeviewSelection.Root>

            <h2>Part 1</h2>
            <p>tbd</p>

            <h2>Part 2</h2>
            <p>Adding Roving tabindex</p>

            <TreeviewRovingTabindex.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {initialValue.map(node => (
                    <TreeviewRovingTabindex.Node node={node} key={node.id} />
                ))}
            </TreeviewRovingTabindex.Root>
            <p>Up and down keybindings</p>

            <TreeviewUpDown.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {initialValue.map(node => (
                    <TreeviewUpDown.Node node={node} key={node.id} />
                ))}
            </TreeviewUpDown.Root>
            <p>Right and left keybindings</p>
            <TreeviewRightLeft.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {initialValue.map(node => (
                    <TreeviewRightLeft.Node node={node} key={node.id} />
                ))}
            </TreeviewRightLeft.Root>
            <p>Updated focus styles</p>
            <TreeviewStyle.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {initialValue.map(node => (
                    <TreeviewStyle.Node node={node} key={node.id} />
                ))}
            </TreeviewStyle.Root>
        </div>
    )
}

// function App() {
//     const [selected, select] = useState<string | null>(null)
//     return (
//         <TreeviewSelection.Root
//             value={selected}
//             onChange={select}
//             className="w-[300px] h-[400px] not-prose"
//         >
//             {initialValue.map(node => (
//                 <TreeviewSelection.Node node={node} key={node.id} />
//             ))}
//         </TreeviewSelection.Root>
//     )
// }

{
    /* <h2>Apple sidebar</h2>

            <AppleTreeview.Root
                value={appleSelected}
                onChange={appleSelect}
                label="Sidebar"
                className="w-[300px] h-[600px] not-prose bg-[#1E1E1E] rounded-[10px] p-4 font-['Source_Sans_Pro']"
            >
                {appleInitialValues.map(node => (
                    <AppleTreeview.Node node={node} key={node.id} />
                ))}
                <style jsx>{`
                    @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap');
                `}</style>
            </AppleTreeview.Root>

            <h2>Really big tree</h2>

            <Treeview.Root
                value={bigSelected}
                onChange={bigSelect}
                label="File manager"
                className="w-[300px] h-[400px]  not-prose"
            >
                {longInitialValues.map(node => (
                    <Treeview.Node node={node} key={node.id} />
                ))}
            </Treeview.Root>
*/
}
{
    /* <h2>Treeview General Structure</h2>
            <TreeviewStructure.Root className="w-[300px] h-[400px]  not-prose ">
                {initialValue.map(node => (
                    <TreeviewStructure.Node node={node} key={node.id} />
                ))}
            </TreeviewStructure.Root>
            <h2>Treeview Open state</h2>
            <TreeviewOpen.Root className="w-[300px] h-[400px]  not-prose  ">
                {initialValue.map(node => (
                    <TreeviewOpen.Node node={node} key={node.id} />
                ))}
            </TreeviewOpen.Root>
            <h2>Treeview Open state indicator</h2>
            <TreeviewOpenIndicator.Root className="w-[300px] h-[400px]  not-prose  ">
                {initialValue.map(node => (
                    <TreeviewOpenIndicator.Node node={node} key={node.id} />
                ))}
            </TreeviewOpenIndicator.Root>
            <h2>Treeview Selection</h2>
            <TreeviewSelection.Root
                value={selected}
                onChange={select}
                className="w-[300px] h-[400px] not-prose"
            >
                {initialValue.map(node => (
                    <TreeviewSelection.Node node={node} key={node.id} />
                ))}
            </TreeviewSelection.Root> */
}
