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

//className="border-2 border-black px-2 pt-0.5 focus:outline-dashed focus:outline-offset-4 focus:outline-2"

export default function Page() {
    return (
        <div className="max-w-5xl p-4 lg:p-8 mx-auto prose prose-headings:font-700">
            <div className="flex flex-row justify-between items-start">
                <h1 className="font-sans">Roving Tabindex</h1>
                <Link href="/">Back to the full list of components</Link>
            </div>
            <p>
                This page is the demo for an article on{' '}
                <a href="https://joshuawootonn.com/react-roving-tabindex">
                    how to create a roving tabindex in react
                </a>
                .
            </p>
            <h2>Intro</h2>
            <p>
                We want to make our group of buttons remember the last focus
                similar to a radio group.
            </p>
            <Step0.RadioComponent />
            <p>but this obviously doesn&apos;t work out of the box</p>
            <Step0.ButtonGroup />
            <h2>get it working</h2>
            <p>
                (Note: until the last step only right arrow moves focus through
                the list of buttons)
            </p>
            <Step1.ButtonGroup />
            <h2>getting order from the dom</h2>
            <Step2.ButtonGroup />
            <h2>good api</h2>
            <Step3.ButtonGroup />
            <h2>tab</h2>
            <p>tab now selects the first node when focusableId is null</p>
            <Step4.ButtonGroup />
            <h2>shift+tab</h2>
            <p>
                shift+tab now works again (we broke it in the previous example)
            </p>
            <Step5.ButtonGroup />
            <h2>Creating our abstraction</h2>
            <p>not much has changed but the code is cleaner</p>
            <Step6.ButtonGroup />
            <h2>ValueId </h2>
            <p>option 2 is initially selected since valueId is set</p>
            <Step7.ButtonGroup />
            <h2>Selectors </h2>
            <p>left arrow should now work!</p>
            <Step8.ButtonGroup />
        </div>
    )
}
