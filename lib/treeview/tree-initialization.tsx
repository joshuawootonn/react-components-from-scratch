import { ChainableMap } from 'lib/utils'

import { TreeState } from './tree-state'

export function getInitialTreeState(): TreeState {
    return {
        isOpen: new ChainableMap<string, boolean>(),
        selectedId: null,
    }
}
