import { RovingTabindexRoot } from 'components/roving-tabindex'
import { TreeViewProvider, initialValue } from 'lib/treeview'

import { TreeNode } from './tree-node'

export function Tree() {
    return (
        <TreeViewProvider initialTree={initialValue} label="File manager">
            {({ treeProps, rootNodes }) => (
                <ul {...treeProps} className="h-full overflow-auto">
                    {rootNodes.map(id => (
                        <TreeNode id={id} key={id} />
                    ))}
                </ul>
            )}
        </TreeViewProvider>
    )
}
