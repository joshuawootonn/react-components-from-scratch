import clsx from 'clsx'
import { motion } from 'framer-motion'
import clamp from 'lodash.clamp'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

type Props = {
  stops: ReactNode[]
  value: number
  onChange: (value: number) => void
  className?: string
}

export function Slider({ className, stops, value, onChange }: Props) {
  const container = useRef<HTMLDivElement | null>(null)
  const [position, setPosition] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (!container.current) return
    const { width: containerWidth } =
      container.current.getBoundingClientRect()
    const segmentWidth = containerWidth / (stops.length - 1)
    setPosition(value * segmentWidth)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', listener)

    return () => window.removeEventListener('resize', listener)

    function listener() {
      if (!container.current) return

      const { width: containerWidth } =
        container.current.getBoundingClientRect()
      const segmentWidth = containerWidth / (stops.length - 1)
      setPosition(value * segmentWidth)
    }
  }, [value])

  useHotkeys(
    'left,down',
    () => {
      if (!container.current) return
      const { width: containerWidth } =
        container.current.getBoundingClientRect()
      const segmentWidth = containerWidth / (stops.length - 1)
      const nextIndex = clamp(value - 1, 0, stops.length - 1)
      setPosition(nextIndex * segmentWidth)
      onChange(nextIndex)
    },
    {},
    [value],
  )

  useHotkeys(
    'right,up',
    () => {
      if (!container.current) return
      const { width: containerWidth } =
        container.current.getBoundingClientRect()
      const segmentWidth = containerWidth / (stops.length - 1)
      const nextIndex = clamp(value + 1, 0, stops.length - 1)
      setPosition(nextIndex * segmentWidth)
      onChange(nextIndex)
    },
    {},
    [value],
  )

  return (
    <div
      className={clsx(
        'relative z-0 w-full flex justify-center items-center touch-none',
        isDragging ? 'cursor-ew-resize' : 'cursor-pointer',
        className,
      )}
      ref={container}
    >
      <div
        className={clsx('w-full py-3 flex gap-1')}
        onClick={e => {
          if (!container.current) return

          const { left: containerLeft, width: containerWidth } =
            container.current.getBoundingClientRect()

          const segmentWidth = containerWidth / (stops.length - 1)
          const offsetLeft = e.clientX - containerLeft
          const nextIndex = Math.round(offsetLeft / segmentWidth)
          setPosition(nextIndex * segmentWidth)
          onChange(nextIndex)
        }}
      >
        {Array.from({ length: stops.length - 1 }).map((stop, i) => (
          <div
            key={i}
            className={clsx('flex-1 h-2 sm:h-3 bg-light w-2', {
              'rounded-l-md': i === 0,
              'rounded-r-md': i === stops.length - 2,
            })}
          />
        ))}
      </div>
      {position != null && (
        <motion.div
          tabIndex={0}
          className={clsx(
            'z-10 absolute left-0 top-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-medium hover:border-dark border-2 shadow-[0px 4px 12px 0px #AB87FF1A] bg-white select-none outline-offset-8 transition-colors cursor-ew-resize',
            { ['border-purple hover:border-purple']: isDragging },
          )}
          initial={false}
          animate={{
            x: position - 14,
            y: '-50%',
          }}
          transition={{
            type: 'tween',
            ease: [0.165, 0.84, 0.44, 1],
            duration: 0.4,
          }}
          onFocus={() => setIsDragging(true)}
          onBlur={() => setIsDragging(false)}
          onPointerDown={e => {
            const { ownerDocument } = e.currentTarget

            setIsDragging(true)

            function onPointerMove(e: PointerEvent) {
              if (!container.current) return

              const {
                width: containerWidth,
                left: containerLeft,
              } = container.current.getBoundingClientRect()

              const segmentWidth =
                containerWidth / (stops.length - 1)
              const index = Math.round(
                (e.clientX - containerLeft) / segmentWidth,
              )
              const clampedIndex = clamp(
                index,
                0,
                stops.length - 1,
              )
              setPosition(clampedIndex * segmentWidth)
              onChange(clampedIndex)
            }

            function onPointerUp(e: PointerEvent) {
              setIsDragging(false)
              ownerDocument.removeEventListener(
                'pointermove',
                onPointerMove,
              )
            }

            ownerDocument.addEventListener(
              'pointermove',
              onPointerMove,
            )
            ownerDocument.addEventListener('pointerup', onPointerUp)
          }}
        >
          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 select-none">
            {stops[value]}
          </div>
        </motion.div>
      )}
    </div>
  )
}
