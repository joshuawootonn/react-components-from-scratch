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
        <div className="max-w-3xl p-4 lg:p-8 mx-auto prose prose-headings:font-700">
            <div className="flex flex-row justify-between items-start">
                <h1 className="font-sans">Roving Tabindex</h1>
                <div className="flex space-x-4">
                    <Link href="https://github.com/joshuawootonn/react-components-from-scratch/blob/main/pages/roving-tabindex.tsx">
                        <svg
                            width="24.5"
                            height="24"
                            viewBox="0 0 98 96"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clip-rule="evenodd"
                                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                                fill="#24292f"
                            />
                        </svg>
                    </Link>
                    <Link href="/">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                            />
                        </svg>
                    </Link>
                </div>
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
