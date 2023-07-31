import Link from 'next/link'
import { useState } from 'react'

import { Slider } from 'components/slider'
import { Circle, Square, Triangle } from 'components/slider/shapes'

export default function Page() {
  const [state, setState] = useState(0)
  return (
    <div className="max-w-2xl p-4 lg:p-8 mx-auto prose prose-headings:font-700">
      <div className="flex flex-row justify-between items-start">
        <h1 className="font-sans">Slider</h1>
        <Link href="/">Back to the full list of components</Link>
      </div>
      <p>
        This page is the demo for an article on{' '}
        <a href="https://joshuawootonn.com/react-slider-component">
          how to create a slider component in react
        </a>
        .
      </p>

      <div className="px-8">
        <Slider
          stops={[
            <Square className="fill-purple" />,
            <Circle className="fill-blue" />,
            <Triangle className="fill-orange" />,
            <Square className="fill-green" />,
            <Circle className="fill-yellow" />,
            <Square className="fill-pink" />,
          ]}
          value={state}
          onChange={(value: number) => setState(value)}
        />
      </div>
    </div>
  )
}
