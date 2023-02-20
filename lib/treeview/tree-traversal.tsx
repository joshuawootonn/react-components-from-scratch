import { TREE_ID } from './tree-state'
import { Item } from './useTreeNode'

export function getFirstNode(items: Item[]): string {
    return items[0]?.id ?? TREE_ID
}

export function getLastNode(items: Item[]): string {
    return items[items.length - 1]?.id ?? TREE_ID
}

export function getNextFocusable(items: Item[], originalId: string, loop: boolean = false): string {
    const index = items.findIndex(({ id }) => id === originalId)
    const nextIndex = index === items.length - 1 ? (loop ? 0 : items.length - 1) : index + 1
    return items[nextIndex].id
}

export function getPreviousFocusable(
    items: Item[],
    originalId: string,
    loop: boolean = false,
): string {
    const index = items.findIndex(({ id }) => id === originalId)
    const prevIndex = index === 0 ? (loop ? items.length - 1 : 0) : index - 1
    return items[prevIndex].id
}

function wrapArray<T>(array: T[], startIndex: number) {
    return array.map((_, index) => array[(startIndex + index) % array.length])
}

export function getNextByTypeahead(items: Item[], originalId: string, keyPressed: string) {
    const index = items.findIndex(({ id }) => id === originalId)
    const wrappedItems = wrapArray(items, index)
    let typeaheadMatchIndex = null

    for (let index = 0; index < wrappedItems.length - 1 && typeaheadMatchIndex == null; index++) {
        const nextItem = wrappedItems.at(index + 1)

        if (
            nextItem?.element?.textContent?.charAt(0).toLowerCase() ===
            keyPressed.charAt(0).toLowerCase()
        ) {
            typeaheadMatchIndex = nextItem.id
        }
    }

    return typeaheadMatchIndex
}
