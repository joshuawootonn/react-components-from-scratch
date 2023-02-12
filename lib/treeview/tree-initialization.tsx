import { ChainableMap } from 'lib/utils'

import { TreeNodeType } from './initialValue'
import { TreeState } from './tree-state'
import { TreeNodeMetadata, TREE_ID } from './tree-state'

function traverseForInitialMetadata(node: TreeNodeType): [string, TreeNodeMetadata][] {
    return [
        [
            node.id,
            {
                name: node.name,
                isFolder: (node.children?.length ?? 0) > 0,
                icon: node.icon ?? null,
            },
        ],
        ...(node?.children?.flatMap(traverseForInitialMetadata) ?? []),
    ]
}

export function getInitialMetadata(rootNodes: TreeNodeType[]): [string, TreeNodeMetadata][] {
    return [
        [TREE_ID, { name: '', isFolder: true, icon: null }],
        ...rootNodes.flatMap(traverseForInitialMetadata),
    ]
}

export function getInitialTreeState(rootNodes: TreeNodeType[]): TreeState {
    return {
        isOpen: new ChainableMap<string, boolean>([[TREE_ID, true]]),
        metadata: new ChainableMap<string, TreeNodeMetadata>(getInitialMetadata(rootNodes)),
        selectedId: null,
    }
}
