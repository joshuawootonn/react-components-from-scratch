import { TreeViewProvider, initialValue } from 'lib/treeview'

import { TreeNode } from './tree-node'

export function Tree() {
    return (
        <TreeViewProvider initialTree={initialValue} label="File manager">
            {({ treeProps }) => (
                <ul data-root-lad {...treeProps} className="h-full overflow-auto">
                    {initialValue.map(({ id }) => (
                        <TreeNode id={id} key={id} />
                    ))}
                </ul>
            )}
        </TreeViewProvider>
    )
}
