import isHotkey from 'is-hotkey'
import { useContext, FocusEvent, MouseEvent, KeyboardEvent, useCallback } from 'react'

import { TreeViewContextType, TreeViewContext } from './tree-context'
import { TreeActionTypes, TreeNodeMetadata } from './tree-state'
import {
    getFirstNode,
    getLastNode,
    getNextByTypeahead,
    getNextFocusable,
    getPreviousFocusable,
} from './tree-traversal'

export type Item = {
    id: string
    element: HTMLElement
}

export function useTreeNode(id: string): {
    isOpen: boolean
    open: () => void
    close: () => void
    isFocused: boolean
    isSelected: boolean
    children: string[]
    metadata: TreeNodeMetadata
    getTreeNodeProps: () => {
        ref: (current: HTMLElement | null) => void
        tabIndex: number
        ['aria-expanded']: boolean
        ['aria-selected']: boolean
        role: 'treeitem'
        onClick: (event: MouseEvent) => void
        onKeyDown: (event: KeyboardEvent) => void
        onBlur: (event: FocusEvent) => void
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

    const getOrderedItems = useCallback((): Item[] => {
        const root = document.querySelector('[data-root-lad]')
        const lads = Array.from(root?.querySelectorAll('[data-tree-lad]') ?? [])

        const items = Array.from(elements.current.toMap())
            .sort((a, b) => lads.indexOf(a[1]) - lads.indexOf(b[1]))
            .map(([id, element]) => {
                return { id, element }
            })
        return items
    }, [])

    return {
        isOpen,
        metadata,
        children,
        isFocused: state.focusedId === id,
        isSelected: state.selectedId === id,
        open: function () {
            dispatch({ type: TreeActionTypes.OPEN, id })
        },
        close: function () {
            dispatch({ type: TreeActionTypes.CLOSE, id })
        },
        getTreeNodeProps: () => ({
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
            tabIndex:
                state.selectedId === id ||
                (state.selectedId == null && getFirstNode(getOrderedItems()) === id)
                    ? 0
                    : -1,
            onClick: function (event: MouseEvent) {
                // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
                // is this the left mouse button / main mouse button
                if (event.button === 0) {
                    event.stopPropagation()

                    if (metadata.isFolder) {
                        isOpen
                            ? dispatch({ type: TreeActionTypes.CLOSE, id })
                            : dispatch({ type: TreeActionTypes.OPEN, id })
                    }
                    dispatch({ type: TreeActionTypes.SET_FOCUSABLE, id })
                    dispatch({ type: TreeActionTypes.SELECT, id })
                }
            },
            onKeyDown: function (event: KeyboardEvent) {
                event.stopPropagation()
                if (isHotkey('up', event)) {
                    event.preventDefault()
                    const items = getOrderedItems()
                    const prevId = getPreviousFocusable(items, id)
                    dispatch({
                        type: TreeActionTypes.SET_FOCUSABLE,
                        id: prevId,
                    })
                    elements.current.get(prevId)?.focus()
                }

                if (isHotkey('down', event)) {
                    event.preventDefault()
                    const items = getOrderedItems()
                    const nextId = getNextFocusable(items, id)
                    dispatch({
                        type: TreeActionTypes.SET_FOCUSABLE,
                        id: nextId,
                    })
                    elements.current.get(nextId)?.focus()
                }

                if (isHotkey('left', event)) {
                    if (isOpen && metadata.isFolder) {
                        dispatch({ type: TreeActionTypes.CLOSE, id })
                    } else {
                        const items = getOrderedItems()
                        const prevId = getPreviousFocusable(items, id)
                        dispatch({
                            type: TreeActionTypes.SET_FOCUSABLE,
                            id: prevId,
                        })
                        elements.current.get(prevId)?.focus()
                    }
                }

                if (isHotkey('right', event)) {
                    if (isOpen && metadata.isFolder) {
                        const items = getOrderedItems()
                        const nextId = getNextFocusable(items, id)
                        dispatch({
                            type: TreeActionTypes.SET_FOCUSABLE,
                            id: nextId,
                        })
                        elements.current.get(nextId)?.focus()
                    } else {
                        dispatch({ type: TreeActionTypes.OPEN, id })
                    }
                }

                if (isHotkey('home', event)) {
                    const items = getOrderedItems()
                    const id = getFirstNode(items)
                    dispatch({ type: TreeActionTypes.SET_FOCUSABLE, id })
                    elements.current.get(id)?.focus()
                }

                if (isHotkey('end', event)) {
                    const items = getOrderedItems()
                    const id = getLastNode(items)
                    dispatch({ type: TreeActionTypes.SET_FOCUSABLE, id })
                    elements.current.get(id)?.focus()
                }

                if (isHotkey('space', event)) {
                    event.preventDefault()
                    dispatch({ type: TreeActionTypes.SELECT, id })
                }

                if (metadata.isFolder && isHotkey('space', event)) {
                    isOpen
                        ? dispatch({ type: TreeActionTypes.CLOSE, id })
                        : dispatch({ type: TreeActionTypes.OPEN, id })
                }

                if (/^[a-z]$/i.test(event.key) && state.focusedId) {
                    const items = getOrderedItems()
                    const nextId = getNextByTypeahead(state, items, id, event.key)

                    dispatch({
                        type: TreeActionTypes.SET_FOCUSABLE,
                        id: nextId,
                    })
                    elements.current.get(nextId)?.focus()
                }
            },
            onFocus: function (event: FocusEvent) {
                event.stopPropagation()
                dispatch({ type: TreeActionTypes.FOCUS, id })
            },
            onBlur: function (event: FocusEvent) {
                event.stopPropagation()
                dispatch({ type: TreeActionTypes.BLUR, id })
            },
        }),
        treeGroupProps: {
            role: 'group',
        },
    }
}
