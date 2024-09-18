import Link from 'next/link'

import {
    Animated,
    AnimatedWithKeyframes,
    AnimatedWithLayout,
    AnimatedWithLayoutWithoutGlitch,
    AnimatedWithStagger,
    AnimateWithGoodTransition,
    AnimateWithGoodTransitionAndAccessibility,
    NoAnimation,
} from 'components/disclosure'

export default function Page() {
    return (
        <div className="max-w-2xl p-4 lg:p-8 mx-auto prose prose-headings:font-700">
            <div className="flex flex-row justify-between items-start">
                <h1 className="font-sans">Disclosure</h1>
                <div className="flex space-x-4">
                    <Link href="https://github.com/joshuawootonn/react-components-from-scratch/blob/main/pages/disclosure.tsx">
                        <svg
                            width="24.5"
                            height="24"
                            viewBox="0 0 98 96"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
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
                <a href="https://joshuawootonn.com/react-disclosure-component">
                    how to create a disclosure component in react
                </a>
                .
            </p>

            <div className="prose w-full space-y-12 mx-auto my-10">
                <h2>No animation</h2>
                <p>
                    boring... :) but works — this is the base component that
                    will be used on the rest of the animations{' '}
                </p>
                <NoAnimation />
                <br />
                <br />
                <br />
                <br />
                <h2>Animation with text being cut off</h2>
                <p>
                    {' '}
                    Framer Motion allows you to animate props from{' '}
                    <code>0</code> to <code>auto</code>. This is pretty dope and
                    the simplest way of animating. Unfortunately this actually
                    animating <code>height</code> in css so watch the perf on
                    this.
                </p>
                <p>
                    (If you want a transform based option scroll down to the
                    layout options)
                </p>
                <pre>
                    <code>
                        {`<AnimatePresence mode="wait">
  {isOpen && (
    <motion.div
      initial={{
        height: 0,
        opacity: 0,
      }}
      animate={{
        height: "auto",
        opacity: 1,
      }}
      exit={{
        height: 0,
        opacity: 0,
      }}
      key="test"
      className="text-lg font-light"
    >
      {props.description}
    </motion.div>
  )}
</AnimatePresence>`}
                    </code>
                </pre>
                <Animated />
                <br />
                <br />
                <br />
                <br />
                <h2>Animation with good transitions </h2>
                <p>
                    My only gripe the above animation is that the text is cut
                    off by the changing height. This is because text size
                    doesn&apos;t shrink based on the height of the element
                    changing. It&apos;s size is determined by the{' '}
                    <code>font-size</code> prop, so it just overflows. In our
                    case, this looks bad. I originally solved this with a bunch
                    of big brain ways, but I recently found that Sam Selikoff
                    had a solution that was really simple.
                    <a
                        className="ml-4 text-purple"
                        href="https://www.youtube.com/watch?v=IfAv4NSv-nA"
                    >
                        source
                    </a>
                </p>
                <pre>
                    <code>
                        {`transition={{
  height: {
    duration: 0.4,
  },
  opacity: {
    duration: 0.3,
  },
}}`}
                    </code>
                </pre>
                <p>
                    Just animate the properties so that the opacity changes
                    sooner than the height. Brilliant!
                </p>
                <AnimateWithGoodTransition />
                <br />
                <br />
                <br />
                <hr />
                <h2>
                    Animation w/ good transitions and the{' '}
                    <a href="https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/">
                        disclosure pattern
                    </a>
                    <br />
                    <span className="text-blue">(Best Current Solution)</span>
                </h2>
                <p>
                    I got some more feedback and update the article to reflect
                    the accessibility upgrade
                </p>
                <AnimateWithGoodTransitionAndAccessibility />
                <br />
                <br />
                <br />
                <hr />
                <h1>Layout API</h1>
                For this specific component a layout animation isn&apos;t
                optimal because it is generally used in a marketing page with
                content following it. Unless you make your entire page motion
                elements with the `layout` prop then your following content will
                jump around. But it is cool to see the simplicity of this
                approach so that is why I am including it here at the end.
                <h2>Using Layout</h2>
                <AnimatedWithLayout />
                <br />
                <br />
                <br />
                <br />
                <h2>Using Layout (Without border radius glitch)</h2>
                You might notice in the last example the corners kinda _twitch_
                on animation. Framer Motion can fix this if we set the
                `borderRadius` as a motion value.
                <AnimatedWithLayoutWithoutGlitch />
                <br />
                <a
                    className="mt-16 text-purple"
                    href="https://www.framer.com/docs/layout-animations/##scale-correction"
                >
                    More info here!
                </a>
                <br />
                <br />
                <br />
                <hr />
                <h1>Other stuff I have tried 💀</h1>
                <p>
                    From here on you are entering the graveyard of what I have
                    tried. Proceed if you must.
                </p>
                <br />
                <br />
                <br />
                <br />
                <h2>Animation by staggering variants</h2>
                <p>ok, just sucks that there is a _delay_ on the exit</p>
                <AnimatedWithStagger />
                <br />
                <br />
                <br />
                <br />
                <h2>Animation by staggering variants</h2>
                <p>
                    me trying to animate height from <code>0</code> to{' '}
                    <code>auto</code> with keyframes{' '}
                    <span className="text-red-500">(this throws)</span>
                </p>
                <AnimatedWithKeyframes />
                <br />
                <br />
                <br />
                <br />
            </div>
        </div>
    )
}
