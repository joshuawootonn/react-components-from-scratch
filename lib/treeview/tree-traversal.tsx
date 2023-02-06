import { TreeState } from './tree-state'
import { TREE_ID } from './tree-state'
import { Item } from './useTreeNode'

export function getFirstNode(items: Item[]): string {
  return items[0]?.id ?? TREE_ID
}

export function getLastNode(items: Item[]): string {
  return items[items.length - 1]?.id ?? TREE_ID
}

export function getNextFocusable(
  items: Item[],
  originalId: string,
  loop: boolean = false,
): string {
  const index = items.findIndex(({ id }) => id === originalId)
  const nextIndex =
    index === items.length - 1
      ? loop
        ? 0
        : items.length - 1
      : index + 1
  return items[nextIndex].id
}

export function getPreviousFocusable(
  items: Item[],
  originalId: string,
  loop: boolean = false,
): string {
  const index = items.findIndex(({ id }) => id === originalId)
  const prevIndex =
    index === 0 ? (loop ? items.length - 1 : 0) : index - 1
  return items[prevIndex].id
}

export function getNextByTypeahead(
  state: TreeState,
  items: Item[],
  originalId: string,
  typeaheadValue: string,
) {
  function traverse(
    state: TreeState,
    key: string,
    id: string,
  ): string {
    if (id === originalId) {
      return originalId
    }

    const name = state.metadata.get(id)?.name

    if (
      name?.charAt(0).toLowerCase() === key.charAt(0).toLowerCase()
    ) {
      return id
    }

    return traverse(state, key, getNextFocusable(items, id, true))
  }

  return traverse(
    state,
    typeaheadValue,
    getNextFocusable(items, originalId, true) ?? getFirstNode(items),
  )
}
