import Link from 'next/link'

import { TreeNode } from 'components/treeview/tree-node'
import { initialValue, TreeViewProvider } from 'lib/treeview'

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
            <div className="w-[300px] h-[400px] space-y-8 flex flex-col not-prose">
                <TreeViewProvider initialTree={initialValue} label="File manager">
                    {({ treeProps }) => (
                        <ul data-root-lad {...treeProps} className="h-full overflow-auto">
                            {initialValue.map(({ id }) => (
                                <TreeNode id={id} key={id} />
                            ))}
                        </ul>
                    )}
                </TreeViewProvider>
            </div>
        </div>
    )
}
