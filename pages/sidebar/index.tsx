import Link from 'next/link'

import * as Step0 from 'components/roving-tabindex/article/step0 - concept-intro'
import * as Step1 from 'components/roving-tabindex/article/step1 - explicit-order'
import * as Step2 from 'components/roving-tabindex/article/step2 - dom-order'
import * as Step3 from 'components/roving-tabindex/article/step3 - cleaner-component-breakdown'
import * as Step4 from 'components/roving-tabindex/article/step4 - tab'
import * as Step5 from 'components/roving-tabindex/article/step5 - shift-tab'
import * as Step6 from 'components/roving-tabindex/article/step6 - abstraction'
import * as Step7 from 'components/roving-tabindex/article/step7 - valueId'
import * as Step8 from 'components/roving-tabindex/article/step8 - selectors'
import { GitlabDemo } from 'components/sidebar/gitlab-demo'
import { LinearDemo } from 'components/sidebar/linear-demo'
import { MakeswiftDemo } from 'components/sidebar/makeswift-demo'
import { NotionDemo } from 'components/sidebar/notion-demo'

//className="border-2 border-black px-2 pt-0.5 focus:outline-dashed focus:outline-offset-4 focus:outline-2"

export default function Page() {
    return (
        <div className="max-w-5xl p-4 lg:p-8 mx-auto prose prose-headings:font-700">
            <div className="flex flex-row justify-between items-start">
                <h1 className="font-sans">Sidebar</h1>
                <Link href="/">Back to the full list of components</Link>
            </div>
            <p>
                This page is the demo for an article I wrote{' '}
                <a href="http://localhost:3001/react-sidebar-performance">
                    comparing performance of different sidebar animations
                </a>
                .
            </p>
            <h2>Links</h2>
            <p>here are the different sidebar animations I created</p>
            <div className="flex space-x-4">
                <Link href="/sidebar/initial">Initial</Link>
                <Link href="/sidebar/linear">Linear</Link>
                <Link href="/sidebar/notion">Notion</Link>
                <Link href="/sidebar/gitlab">Gitlab</Link>
            </div>
            <h2>SVG demos</h2>
            <p>
                Along the way I created SVG demos to illustrate how the sidebars
                were different.
            </p>
            <h3>Initial sidebar</h3>
            <div className="w-[600px]">
                <MakeswiftDemo />
            </div>
            <h3>Notion's sidebar</h3>
            <div className="w-[600px]">
                <NotionDemo />
            </div>
            <h3>Linear's sidebar</h3>
            <div className="w-[600px]">
                <LinearDemo />
            </div>
            <h3>Gitlab's sidebar</h3>
            <div className="w-[600px]">
                <GitlabDemo />
            </div>
        </div>
    )
}
