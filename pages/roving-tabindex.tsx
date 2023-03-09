import Link from 'next/link'

import * as Step0 from 'components/roving-tabindex/article/step0 - concept-intro'
import * as Step1 from 'components/roving-tabindex/article/step1 - explicit-order'
import * as Step2 from 'components/roving-tabindex/article/step2 - dom-order'
import * as Step3 from 'components/roving-tabindex/article/step3 - cleaner-component-breakdown'
import * as Step4 from 'components/roving-tabindex/article/step4 - tab'
import * as Step5 from 'components/roving-tabindex/article/step5 - shift-tab'
import * as Step6 from 'components/roving-tabindex/article/step6 - abstraction'

export default function Page() {
    return (
        <div className="max-w-5xl p-4 lg:p-8 mx-auto prose prose-headings:font-700 ">
            <div className="flex flex-row justify-between items-start">
                <h1 className="font-sans">Treeview (wip)</h1>
                <Link href="/">Back to the full list of components</Link>
            </div>
            <p>
                This treeview is currently marked as wip as I write the related post explaining it.
                But the code is really there so check it out if you need to do something similar.
            </p>

            <Step0.RadioComponent />
            <h2>Step 1</h2>
            <Step0.MyComponent />

            <h2>get it working</h2>
            <Step1.MyComponent />

            <h2>order from the dom</h2>
            <Step2.MyComponent />

            <h2>good api</h2>
            <Step3.MyComponent />

            <h2>handling tab</h2>
            <Step4.MyComponent />

            <h2>handling tab</h2>
            <Step5.MyComponent />

            <h2>abstraction </h2>
            <Step6.MyComponent />
        </div>
    )
}
