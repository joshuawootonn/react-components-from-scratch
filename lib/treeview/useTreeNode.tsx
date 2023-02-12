import isHotkey from 'is-hotkey'
import {
    useContext,
    FocusEvent,
    MouseEvent,
    KeyboardEvent,
    ComponentPropsWithoutRef,
    ElementType,
    useMemo,
    useCallback,
} from 'react'

import {
    getFirstFocusable,
    getLastFocusable,
    getNextFocusable,
    getParentFocusable,
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

    const { currentRovingTabindexValue, getOrderedItems, rovingProps } = useRovingTabindex(id)

    const ref = useCallback(
        function (element: HTMLElement | null) {
            if (element) {
                elements.current.set(id, element)
            } else {
                elements.current.delete(id)
            }
        },
        [elements, id],
    )

    return useMemo(() => {
        const isOpen = state.isOpen.get(id) ?? false
        const metadata = state.metadata.get(id) ?? {
            name: 'Untitled',
            isFolder: false,
        }
        const children = state.children.get(id) ?? []

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
                ref,
                ['aria-expanded']: metadata.isFolder && isOpen,
                ['aria-selected']: state.selectedId === id,
                role: 'treeitem',
                tabIndex: currentRovingTabindexValue === id ? 0 : -1,
                onClick: function (e: MouseEvent) {
                    e.stopPropagation()
                    props.onClick?.(e)
                    if (e.button === 0) {
                        if (metadata.isFolder) {
                            isOpen
                                ? dispatch({ type: TreeActionTypes.CLOSE, id })
                                : dispatch({ type: TreeActionTypes.OPEN, id })
                        }
                        dispatch({ type: TreeActionTypes.SELECT, id })
                    }
                },
                onKeyDown: function (e: KeyboardEvent) {
                    e.stopPropagation()
                    props.onKeyDown?.(e)
                    rovingProps.onKeyDown(e)

                    let nextIdToFocus: string | null = null
                    const items = getOrderedItems()

                    if (isHotkey('up', e)) {
                        e.preventDefault()
                        nextIdToFocus = getPrevFocusable(items, id)
                    } else if (isHotkey('down', e)) {
                        e.preventDefault()
                        nextIdToFocus = getNextFocusable(items, id)
                    } else if (isHotkey('left', e)) {
                        if (isOpen && metadata.isFolder) {
                            dispatch({ type: TreeActionTypes.CLOSE, id })
                        } else {
                            nextIdToFocus = getParentFocusable(items, id)
                        }
                    } else if (isHotkey('right', e)) {
                        if (isOpen && metadata.isFolder) {
                            nextIdToFocus = getNextFocusable(items, id)
                        } else {
                            dispatch({ type: TreeActionTypes.OPEN, id })
                        }
                    } else if (isHotkey('home', e)) {
                        nextIdToFocus = getFirstFocusable(items)
                    } else if (isHotkey('end', e)) {
                        nextIdToFocus = getLastFocusable(items)
                    } else if (isHotkey('space', e)) {
                        e.preventDefault()
                        dispatch({ type: TreeActionTypes.SELECT, id })
                        if (metadata.isFolder) {
                            isOpen
                                ? dispatch({ type: TreeActionTypes.CLOSE, id })
                                : dispatch({ type: TreeActionTypes.OPEN, id })
                        }
                    } else if (/^[a-z]$/i.test(e.key)) {
                        nextIdToFocus = getNextByTypeahead(state, items, id, e.key)
                    }

                    if (nextIdToFocus != null) {
                        elements.current.get(nextIdToFocus)?.focus()
                    }
                },
            }),
            treeGroupProps: {
                role: 'group',
            },
        }
    }, [
        currentRovingTabindexValue,
        dispatch,
        elements,
        getOrderedItems,
        id,
        ref,
        rovingProps,
        state,
    ])
}
