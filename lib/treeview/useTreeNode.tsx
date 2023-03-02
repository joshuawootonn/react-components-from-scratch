import isHotkey from 'is-hotkey'
import {
    useContext,
    FocusEvent,
    MouseEvent,
    KeyboardEvent,
    ComponentPropsWithoutRef,
    ElementType,
    useMemo,
} from 'react'

import {
    getFirstFocusable,
    getLastFocusable,
    getNextFocusable,
    getNextFocusableByTypeahead,
    getParentFocusable,
    getPrevFocusable,
    NOT_FOCUSABLE_SELECTOR,
    useRovingTabindex,
} from 'components/roving-tabindex'

import { TreeViewContextType, TreeViewContext, TreeViewActionTypes } from './tree-state'

export type Item = {
    id: string
    element: HTMLElement
}

export function useTreeNode<T extends ElementType>(
    id: string,
    options: {
        selectionType: 'followFocus' | 'distinct'
        isFolder: boolean
    } = {
        selectionType: 'followFocus',
        isFolder: false,
    },
): {
    isOpen: boolean
    open: () => void
    close: () => void
    isFocusable: boolean
    isSelected: boolean
    getTreeNodeProps: (props: ComponentPropsWithoutRef<T>) => {
        ref: (current: HTMLElement | null) => void
        tabIndex: number
        ['aria-expanded']: boolean
        ['aria-selected']: boolean
        role: 'treeitem'
        onClick: (event: MouseEvent) => void
        onKeyDown: (event: KeyboardEvent) => void
        onFocus: (event: FocusEvent) => void
    }
    treeGroupProps: {
        role: 'group'
    }
} {
    const { open, selectedId, selectId, dispatch } =
        useContext<TreeViewContextType>(TreeViewContext)

    const { currentRovingTabindexValue, getOrderedItems, rovingProps, ref } = useRovingTabindex(id)

    return useMemo(() => {
        const isOpen = open.get(id) ?? false

        return {
            isOpen,
            isFocusable: currentRovingTabindexValue === id,
            isSelected: selectedId === id,
            open: function () {
                dispatch({ type: TreeViewActionTypes.OPEN, id })
            },
            close: function () {
                dispatch({ type: TreeViewActionTypes.CLOSE, id })
            },
            getTreeNodeProps: (props: ComponentPropsWithoutRef<T>) => ({
                ...props,
                ...rovingProps,
                [NOT_FOCUSABLE_SELECTOR]: !isOpen,
                ref,
                ['aria-expanded']: isOpen,
                ['aria-selected']: selectedId === id,
                role: 'treeitem',
                tabIndex: currentRovingTabindexValue === id ? 0 : -1,
                onClick: function (e: MouseEvent) {
                    e.stopPropagation()
                    props.onClick?.(e)
                    rovingProps.onClick(e)
                    if (e.button === 0) {
                        if (options.isFolder) {
                            isOpen
                                ? dispatch({ type: TreeViewActionTypes.CLOSE, id })
                                : dispatch({ type: TreeViewActionTypes.OPEN, id })
                        }
                        selectId(id)
                    }
                },
                onKeyDown: function (e: KeyboardEvent) {
                    e.stopPropagation()
                    props.onKeyDown?.(e)
                    rovingProps.onKeyDown(e)

                    let nextItemToFocus: Item | undefined
                    const items = getOrderedItems()

                    if (isHotkey('up', e)) {
                        e.preventDefault()
                        nextItemToFocus = getPrevFocusable(items, id)
                    } else if (isHotkey('down', e)) {
                        e.preventDefault()
                        nextItemToFocus = getNextFocusable(items, id)
                    } else if (isHotkey('left', e)) {
                        if (isOpen && options.isFolder) {
                            dispatch({ type: TreeViewActionTypes.CLOSE, id })
                        } else {
                            nextItemToFocus = getParentFocusable(items, id)
                        }
                    } else if (isHotkey('right', e)) {
                        if (isOpen && options.isFolder) {
                            nextItemToFocus = getNextFocusable(items, id)
                        } else {
                            dispatch({ type: TreeViewActionTypes.OPEN, id })
                        }
                    } else if (isHotkey('home', e)) {
                        e.preventDefault()
                        nextItemToFocus = getFirstFocusable(items)
                    } else if (isHotkey('end', e)) {
                        e.preventDefault()
                        nextItemToFocus = getLastFocusable(items)
                    } else if (isHotkey('space', e)) {
                        e.preventDefault()
                        selectId(id)
                    } else if (/^[a-z]$/i.test(e.key)) {
                        nextItemToFocus = getNextFocusableByTypeahead(items, id, e.key)
                    }

                    if (nextItemToFocus != null) {
                        nextItemToFocus.element.focus()
                        options.selectionType === 'followFocus' && selectId(nextItemToFocus.id)
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
        getOrderedItems,
        id,
        open,
        options.isFolder,
        options.selectionType,
        ref,
        rovingProps,
        selectId,
        selectedId,
    ])
}
