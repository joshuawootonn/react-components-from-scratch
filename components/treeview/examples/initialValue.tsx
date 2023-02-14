import { v4 as uuid } from 'uuid'

import { TreeNodeType } from 'lib/treeview'

export const appleInitialValues: TreeNodeType[] = [
    {
        id: uuid(),
        name: 'components',
        children: [
            {
                id: uuid(),
                name: 'toggle-group',
                children: [
                    {
                        id: uuid(),
                        name: 'index.ts',
                        children: [],
                    },
                    {
                        id: uuid(),
                        name: 'toggle-group.tsx',
                        children: [],
                    },
                ],
            },
            {
                id: uuid(),
                name: 'treeview',
                children: [
                    {
                        id: uuid(),
                        name: 'examples',
                        children: [
                            {
                                id: uuid(),
                                name: 'apple-sidebar.tsx',
                                children: [],
                            },
                            {
                                id: uuid(),
                                name: 'index.ts',
                                children: [],
                            },
                        ],
                    },
                    {
                        id: uuid(),
                        name: 'icons.tsx',
                        children: [],
                    },
                    {
                        id: uuid(),
                        name: 'index.tsx',
                        children: [],
                    },
                    {
                        id: uuid(),
                        name: 'treeview.tsx',
                        children: [],
                    },
                ],
            },
            {
                id: uuid(),
                name: 'roving-tabindex.tsx',
                children: [],
            },
            {
                id: uuid(),
                name: 'index.tsx',
                children: [],
            },
        ],
    },
    {
        id: uuid(),
        name: 'lib',
        children: [
            {
                id: uuid(),
                name: 'treeview',
                children: [
                    {
                        id: uuid(),
                        name: 'index.ts',
                        children: [],
                    },
                    {
                        id: uuid(),
                        name: 'initialValue',
                        children: [],
                    },
                    {
                        id: uuid(),
                        name: 'tree-context.tsx',
                        children: [],
                    },
                    {
                        id: uuid(),
                        name: 'tree-initialization.tsx',
                        children: [],
                    },
                    {
                        id: uuid(),
                        name: 'tree-state.tsx',
                        children: [],
                    },
                    {
                        id: uuid(),
                        name: 'tree-traversal.tsx',
                        children: [],
                    },
                    {
                        id: uuid(),
                        name: 'useTreeNode.tsx',
                        children: [],
                    },
                ],
            },
            {
                id: uuid(),
                name: 'utils',
                children: [
                    {
                        id: uuid(),
                        name: 'chainable-map.ts',
                        children: [],
                    },
                    {
                        id: uuid(),
                        name: 'index.ts',
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        id: uuid(),
        name: 'pages',
        children: [
            {
                id: uuid(),
                name: '_app.tsx',
                children: [
                    {
                        id: uuid(),
                        name: 'hello.ts',
                    },
                ],
            },
            {
                id: uuid(),
                name: '_app.tsx',
            },
            {
                id: uuid(),
                name: '_document.tsx',
            },
            {
                id: uuid(),
                name: 'index.tsx',
            },
            {
                id: uuid(),
                name: 'toggle-group.tsx',
            },
            {
                id: uuid(),
                name: 'treeview.tsx',
            },
        ],
    },
    {
        id: uuid(),
        name: 'public',
        children: [
            {
                id: uuid(),
                name: 'favicon.ico',
            },
            {
                id: uuid(),
                name: 'file.png',
            },
            {
                id: uuid(),
                name: 'folder.png',
            },
            {
                id: uuid(),
                name: 'next.svg',
            },
            {
                id: uuid(),
                name: 'thirteen.svg',
            },
            {
                id: uuid(),
                name: 'vercel.svg',
            },
        ],
    },
    {
        id: uuid(),
        name: 'styles',
        children: [
            {
                id: uuid(),
                name: 'global.css',
            },
        ],
    },
    {
        id: uuid(),
        name: '.eslintrc.json',
    },
    {
        id: uuid(),
        name: '.gitignore',
    },
    {
        id: uuid(),
        name: '.prettierrc.js',
    },
    {
        id: uuid(),
        name: 'next-env.d.ts',
    },
    {
        id: uuid(),
        name: 'next.config.js',
    },
    {
        id: uuid(),
        name: 'package.json',
    },
    {
        id: uuid(),
        name: 'postcss.config.js',
    },
    {
        id: uuid(),
        name: 'README.md',
    },
    {
        id: uuid(),
        name: 'tailwind.config.js',
    },
    {
        id: uuid(),
        name: 'tsconfig.json',
    },
    {
        id: uuid(),
        name: 'yarn.lock',
    },
]
