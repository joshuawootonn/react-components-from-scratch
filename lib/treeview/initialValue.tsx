export type TreeNodeType = {
    id: string
    name: string
    children?: TreeNodeType[]
    isFolder?: boolean
    isExpanded?: boolean
}

export const initialValue: TreeNodeType[] = [
    {
        id: '1',
        name: 'A - 1',
        children: [
            {
                id: '2',
                name: 'A - 2',
                children: [
                    {
                        id: '3',
                        name: 'Child - 3',
                        children: [
                            {
                                id: '4',
                                name: 'Child - 4',
                                children: [
                                    {
                                        id: '5',
                                        name: 'Child - 5',
                                    },
                                    {
                                        id: '6',
                                        name: 'Child - 6',
                                    },
                                ],
                            },
                            {
                                id: '7',
                                name: 'Child - 7',
                            },
                        ],
                    },
                    {
                        id: '8',
                        name: 'Child - 8',
                        children: [
                            {
                                id: '9',
                                name: 'Child - 9',
                                children: [
                                    {
                                        id: '10',
                                        name: 'Child - 10',
                                    },
                                    {
                                        id: '11',
                                        name: 'Child - 11',
                                    },
                                ],
                            },
                            {
                                id: '12',
                                name: 'Child - 12',
                            },
                        ],
                    },
                ],
            },
            {
                id: '13',
                name: 'B - 13',
            },
            {
                id: '14',
                name: 'C - 14',
                children: [
                    {
                        id: '15',
                        name: 'Child - 15',
                    },
                    {
                        id: '16',
                        name: 'Child - 16',
                    },
                ],
            },
        ],
    },
    {
        id: '17',
        name: 'B - 17',
        children: [
            {
                id: '18',
                name: 'C - 18',
                children: [
                    {
                        id: '19',
                        name: 'Child - 19',
                        children: [
                            {
                                id: '20',
                                name: 'Child - 20',
                                children: [
                                    {
                                        id: '21',
                                        name: 'Child - 21',
                                    },
                                    {
                                        id: '22',
                                        name: 'Child - 22',
                                    },
                                ],
                            },
                            {
                                id: '23',
                                name: 'Child - 23',
                            },
                        ],
                    },
                    {
                        id: '24',
                        name: 'Child - 24',
                    },
                ],
            },
            {
                id: '25',
                name: 'A - 25',
            },
            {
                id: '26',
                name: 'B - 26',
            },
        ],
    },
    {
        id: '27',
        name: 'C - 27',
        children: [
            {
                id: '28',
                name: 'B - 28',
                children: [
                    {
                        id: '29',
                        name: 'Child - 29',
                        children: [
                            {
                                id: '30',
                                name: 'Child - 30',
                                children: [
                                    {
                                        id: '31',
                                        name: 'Child - 31',
                                    },
                                    {
                                        id: '32',
                                        name: 'Child - 32',
                                    },
                                ],
                            },
                            {
                                id: '33',
                                name: 'Child - 33',
                            },
                        ],
                    },
                    {
                        id: '34',
                        name: 'Child - 34',
                    },
                ],
            },
            {
                id: '35',
                name: 'C - 35',
            },
            {
                id: '36',
                name: 'A - 36',
            },
        ],
    },
]

// export const initialValue: MyTreeNode[] = [
//   {
//     id: "1",
//     name: "Folder - Root",
//     isFolder: true,
//     isExpanded: true,
//   },
//   {
//     id: "2",
//     name: "Folder - 1",
//     isFolder: true,
//     isExpanded: true,
//     parentId: "1",
//   },
//   {
//     id: "3",
//     name: "File - 3",
//     isFolder: false,
//     parentId: "1",
//   },
//   {
//     id: "4",
//     name: "File - 4",
//     isFolder: false,
//     parentId: "1",
//   },
//   {
//     id: "5",
//     name: "File - 5",
//     isFolder: false,
//     parentId: "2",
//   },
//   {
//     id: "6",
//     name: "File - 6",
//     isFolder: false,
//     parentId: "2",
//   },
//   {
//     id: "11",
//     name: "Folder - Root 2",
//     isFolder: true,
//     isExpanded: true,
//   },
//   {
//     id: "21",
//     name: "Folder - 11",
//     isFolder: true,
//     isExpanded: true,
//     parentId: "11",
//   },
//   {
//     id: "31",
//     name: "Folder - 31",
//     isFolder: true,
//     parentId: "11",
//   },
//   {
//     id: "41",
//     name: "File - 41",
//     isFolder: false,
//     parentId: "11",
//   },
//   {
//     id: "51",
//     name: "File - 51",
//     isFolder: false,
//     parentId: "31",
//   },
//   {
//     id: "61",
//     name: "File - 61",
//     isFolder: false,
//     parentId: "31",
//   },
// ];

// export const initialValue: MyTreeNode[] = [
//   {
//     id: "1",
//     name: "Folder - Root",
//     isFolder: true,
//     isExpanded: true,
//     childrenIds: ["2", "3", "4"],
//   },
//   {
//     id: "2",
//     name: "Folder - 1",
//     isFolder: true,
//     isExpanded: true,
//     childrenIds: ["5", "6"],
//   },
//   {
//     id: "3",
//     name: "File - 1",
//     isFolder: false,
//   },
//   {
//     id: "4",
//     name: "File - 2",
//     isFolder: true,
//   },
//   {
//     id: "5",
//     name: "File - 5",
//     isFolder: false,
//   },
//   {
//     id: "6",
//     name: "File - 6",
//     isFolder: true,
//   },
// ];
