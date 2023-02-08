import isHotkey, { toKeyCode, toKeyName } from 'is-hotkey'
import {
    useContext,
    FocusEvent,
    MouseEvent,
    KeyboardEvent,
    useCallback,
    ComponentPropsWithoutRef,
    ElementType,
} from 'react'

import {
    getFirstFocusable,
    getLastFocusable,
    getNextFocusable,
    getPrevFocusable,
    useRovingTabindex,
} from 'components/roving-tabindex'

import { TreeViewContextType, TreeViewContext } from './tree-context'
import { TreeActionTypes, TreeNodeMetadata } from './tree-state'
import { getNextByTypeahead } from './tree-traversal'

export type Item = {
    id: string
    element: HTMLElement
}

export function useTreeNode<T extends ElementType>(
    id: string,
): {
    isOpen: boolean
    open: () => void
    close: () => void
    isFocusable: boolean
    isSelected: boolean
    children: string[]
    metadata: TreeNodeMetadata
    getTreeNodeProps: (props: ComponentPropsWithoutRef<T>) => {
        ref: (current: HTMLElement | null) => void
        tabIndex: number
        ['aria-expanded']: boolean
        ['aria-selected']: boolean
        role: 'treeitem'
        onMouseDown: (event: MouseEvent) => void
        onClick: (event: MouseEvent) => void
        onKeyDown: (event: KeyboardEvent) => void
        onFocus: (event: FocusEvent) => void
    }
    treeGroupProps: {
        role: 'group'
    }
} {
    const { state, dispatch, elements } = useContext<TreeViewContextType>(TreeViewContext)

    const isOpen = state.isOpen.get(id) ?? false
    const metadata = state.metadata.get(id) ?? {
        name: 'Untitled',
        isFolder: false,
    }
    const children = state.children.get(id) ?? []

    const { currentRovingTabindexValue, getOrderedItems, rovingProps } = useRovingTabindex(id)

    return {
        isOpen,
        metadata,
        children,
        isFocusable: currentRovingTabindexValue === id,
        isSelected: state.selectedId === id,
        open: function () {
            dispatch({ type: TreeActionTypes.OPEN, id })
        },
        close: function () {
            dispatch({ type: TreeActionTypes.CLOSE, id })
        },
        getTreeNodeProps: (props: ComponentPropsWithoutRef<T>) => ({
            ...props,
            ...rovingProps,
            ref: function (element: HTMLElement | null) {
                if (element) {
                    elements.current.set(id, element)
                } else {
                    elements.current.delete(id)
                }
            },
            ['aria-expanded']: metadata.isFolder && isOpen,
            ['aria-selected']: state.selectedId === id,
            role: 'treeitem',
            tabIndex: state.focusableId === id ? 0 : -1,
            onClick: function (event: MouseEvent) {
                event.stopPropagation()
                props.onClick?.(event)
                if (event.button === 0) {
                    if (metadata.isFolder) {
                        isOpen
                            ? dispatch({ type: TreeActionTypes.CLOSE, id })
                            : dispatch({ type: TreeActionTypes.OPEN, id })
                    }
                    dispatch({ type: TreeActionTypes.SELECT, id })
                }
            },
            onMouseDown: function (event: MouseEvent) {
                props.onMouseDown?.(event)
                rovingProps.onMouseDown(event)
            },
            onKeyDown: function (event: KeyboardEvent) {
                if (event.target !== event.currentTarget) return
                props.onKeyDown?.(event)
                rovingProps.onKeyDown(event)

                let nextIdToFocus: string | null = null
                const items = getOrderedItems()

                if (isHotkey('up', event)) {
                    event.preventDefault()
                    nextIdToFocus = getPrevFocusable(items, id)
                } else if (isHotkey('down', event)) {
                    event.preventDefault()
                    nextIdToFocus = getNextFocusable(items, id)
                } else if (isHotkey('left', event)) {
                    if (isOpen && metadata.isFolder) {
                        dispatch({ type: TreeActionTypes.CLOSE, id })
                    } else {
                        nextIdToFocus = getPrevFocusable(items, id)
                    }
                } else if (isHotkey('right', event)) {
                    if (isOpen && metadata.isFolder) {
                        nextIdToFocus = getNextFocusable(items, id)
                    } else {
                        dispatch({ type: TreeActionTypes.OPEN, id })
                    }
                } else if (isHotkey('home', event)) {
                    nextIdToFocus = getFirstFocusable(items)
                } else if (isHotkey('end', event)) {
                    nextIdToFocus = getLastFocusable(items)
                } else if (isHotkey('space', event)) {
                    event.preventDefault()
                    dispatch({ type: TreeActionTypes.SELECT, id })
                    if (metadata.isFolder) {
                        isOpen
                            ? dispatch({ type: TreeActionTypes.CLOSE, id })
                            : dispatch({ type: TreeActionTypes.OPEN, id })
                    }
                } else if (/^[a-z]$/i.test(event.key)) {
                    nextIdToFocus = getNextByTypeahead(state, items, id, event.key)
                }

                if (nextIdToFocus != null) {
                    elements.current.get(nextIdToFocus)?.focus()
                }
            },
            onFocus: function (event: FocusEvent) {
                if (event.target !== event.currentTarget) return
                props.onFocus?.(event)
                rovingProps.onFocus(event)
                dispatch({ type: TreeActionTypes.SET_FOCUSABLE, id })
            },
        }),
        treeGroupProps: {
            role: 'group',
        },
    }
}
