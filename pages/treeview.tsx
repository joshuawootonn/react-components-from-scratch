import Link from 'next/link'

import { Treeview } from 'components/treeview'
import {
    AppleTreeview,
    initialValue as appleInitialValues,
} from 'components/treeview/examples/apple-sidebar'
import { initialValue, longInitialValues } from 'lib/treeview'

export default function ToggleGroupPage() {
    return (
        <div className="max-w-5xl p-4 lg:p-8 mx-auto prose prose-headings:font-700 ">
            <div className="flex flex-row justify-between items-start">
                <h1 className="font-sans">Treeview (wip)</h1>
                <Link href="/">Back to the full list of components</Link>
            </div>
            <p>
                This treeview is currently marked as wip as I write the related post explaining it.
                But the code is really there so check it out if you need to do something similar.
            </p>
            <h2>Regular tree</h2>

            <Treeview.Root
                value={initialValue}
                label="File manager"
                className="w-[300px] h-[400px] flex flex-col not-prose"
            >
                {initialValue.map(node => (
                    <Treeview.Node id={node.id} key={node.id}>
                        {node.children}
                    </Treeview.Node>
                ))}
            </Treeview.Root>

            <h2>Apple sidebar</h2>

            <AppleTreeview.Root
                value={appleInitialValues}
                label="Sidebar"
                className="w-[300px] h-[400px] flex flex-col not-prose"
            >
                {appleInitialValues.map(node => (
                    <AppleTreeview.Node node={node} key={node.id} />
                ))}
            </AppleTreeview.Root>

            <h2>Really big tree</h2>

            <Treeview.Root
                value={longInitialValues}
                label="File manager"
                className="w-[300px] h-[400px] flex flex-col not-prose"
            >
                {longInitialValues.map(node => (
                    <Treeview.Node id={node.id} key={node.id}>
                        {node.children}
                    </Treeview.Node>
                ))}
            </Treeview.Root>
        </div>
    )
}
