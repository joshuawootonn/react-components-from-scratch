import Link from 'next/link'
import { useState } from 'react'

import { Circle, Square, Triangle } from 'components/vercel-tabs/shapes'
import { CSSTabs, useTabs as useCSSTabs } from 'components/vercel-tabs/css'
import { Framer, useTabs as useFramerMotionTabs } from 'components/vercel-tabs/framer'
import { Spring, useTabs as useReactSpringTabs } from 'components/vercel-tabs/react-spring'
import { TransitionGroupTabs, useTabs as useTransitionGroupTabs } from 'components/vercel-tabs/transition-group'

export default function App() {
    const [hookProps] = useState({
        tabs: [
            {
                label: 'Circle',
                children: <Circle />,
                id: 'Circle',
            },
            {
                label: 'Triangle',
                children: <Triangle />,
                id: 'Triangle',
            },
            {
                label: 'Square',
                children: <Square />,
                id: 'Square',
            },
        ],
        initialTabId: 'Triangle',
    })

    const css = useCSSTabs(hookProps)
    const transitionGroup = useTransitionGroupTabs(hookProps)
    const spring = useReactSpringTabs(hookProps)
    const framerMotion = useFramerMotionTabs(hookProps)

    return (
        <div className="max-w-2xl p-4 lg:p-8 mx-auto prose prose-headings:font-700 ">
            <div className="flex flex-row justify-between items-start">
                <h1 className="font-sans">Vercel&apos;s tabs</h1>
                <Link href="/">Back to the full list of components</Link>
            </div>
            <p>
                This page contains the collections of demos from{' '} 
                <Link href="https://www.joshuawootonn.com/vercel-tabs-component">
                    a blog post &#x2197;
                </Link> I wrote recreating Vercel&apos;s tabs component.
            </p>
            <h2>CSS</h2>
            <div className="flex flex-col items-center min-h-[330px] max-w-6xl">
                <CSSTabs {...css.tabProps} />
                <div className="w-60 p-9">{css.selectedTab.children}</div>
            </div>
            <h2>React Transition Group</h2>
            <div className="flex flex-col items-center min-h-[330px] max-w-6xl">
                <TransitionGroupTabs {...transitionGroup.tabProps} />
                <div className="w-60 p-9">
                    {transitionGroup.selectedTab.children}
                </div>
            </div>
            <h2>React Spring</h2>
            <div className="flex flex-col items-center min-h-[330px] max-w-6xl">
                <Spring.Tabs {...spring.tabProps} />
                <Spring.Content {...spring.contentProps} className="w-60 p-9" />
            </div>
            <h2>Framer Motion</h2>
            <div className="flex flex-col items-center min-h-[330px] max-w-6xl">
                <Framer.Tabs {...framerMotion.tabProps} />
                <Framer.Content
                    {...framerMotion.contentProps}
                    className="text-center rounded-3xl w-60 p-9"
                >
                    {framerMotion.selectedTab.children}
                </Framer.Content>
            </div>
            {/*

                There was some odd flickering so I just opted to remove this section.

            <h2>Framer Motion Layout API (Bonus)</h2>
            <div className="flex flex-col items-center min-h-[330px] max-w-6xl">
                <FramerLayout.Tabs {...framerMotionLayout.tabProps} />
                <FramerLayout.Content
                    {...framerMotionLayout.contentProps}
                    className="text-center rounded-3xl w-60 p-9"
                >
                    {framerMotionLayout.selectedTab.children}
                </FramerLayout.Content>
            </div>
            */}
        </div>
    )
}
