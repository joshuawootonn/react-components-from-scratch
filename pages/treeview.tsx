import Link from 'next/link'

import { TreeNode } from 'components/treeview/tree-node'
import { initialValue, longInitialValues, TreeViewProvider } from 'lib/treeview'

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
            <TreeViewProvider
                initialTree={initialValue}
                label="File manager"
                className="w-[300px] h-[400px] space-y-8 flex flex-col not-prose"
            >
                {({ treeProps }) => (
                    <ul {...treeProps} className="h-full overflow-auto">
                        {initialValue.map(({ id }) => (
                            <TreeNode id={id} key={id} />
                        ))}
                    </ul>
                )}
            </TreeViewProvider>
            <h2>Really big tree</h2>
            <TreeViewProvider
                initialTree={longInitialValues}
                label="File manager"
                className="w-[300px] max-h-[400px] space-y-8 flex flex-col not-prose"
            >
                {({ treeProps, rootNodes }) => (
                    <ul {...treeProps} className="h-full overflow-auto">
                        {rootNodes.map(id => (
                            <TreeNode id={id} key={id} />
                        ))}
                    </ul>
                )}
            </TreeViewProvider>
        </div>
    )
}
