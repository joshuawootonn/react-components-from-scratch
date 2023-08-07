import classNames from "clsx";
import { useEffect, useRef, useState } from "react";
import { useTransition, animated, useSpring, easings } from "react-spring";

import { Tab } from "./useTabs";

type Props = {
  selectedTabIndex: number;
  tabs: Tab[];
  setSelectedTab: (input: [number, number]) => void;
};

export const Tabs = ({
  tabs,
  selectedTabIndex,
  setSelectedTab,
}: Props): JSX.Element => {
  const [buttonRefs, setButtonRefs] = useState<Array<HTMLButtonElement | null>>(
    []
  );

  useEffect(() => {
    setButtonRefs((prev) => prev.slice(0, tabs.length));
  }, [tabs.length]);

  const navRef = useRef<HTMLDivElement>(null);
  const navRect = navRef.current?.getBoundingClientRect();

  const selectedRect = buttonRefs[selectedTabIndex]?.getBoundingClientRect();

  const [hoveredTabIndex, setHoveredTabIndex] = useState<number | null>(null);
  const hoveredRect =
    buttonRefs[hoveredTabIndex ?? -1]?.getBoundingClientRect();

  const onLeaveTabs = () => {
    setHoveredTabIndex(null);
  };

  const onEnterTab = (i: number) => {
    setHoveredTabIndex(i);
  };

  const onSelectTab = (i: number) => {
    setSelectedTab([i, i > selectedTabIndex ? 1 : -1]);
  };

  const stylesChangingOnUpdate =
    hoveredRect && navRect
      ? {
          transform: `translate3d(${hoveredRect.left - navRect.left}px,${
            hoveredRect.top - navRect.top
          }px,0px)`,
          width: hoveredRect.width,
          height: hoveredRect.height,
        }
      : {};

  const bgTransition = useTransition(hoveredTabIndex != null, {
    from: () => ({
      ...stylesChangingOnUpdate,
      opacity: 0,
    }),
    enter: {
      ...stylesChangingOnUpdate,
      opacity: 1,
    },
    update: stylesChangingOnUpdate,
    leave: { opacity: 0 },
    config: {
      duration: 150,
      easing: easings.easeOutCubic,
    },
  });

  const underlineStyles = useSpring({
    to:
      selectedRect && navRect
        ? {
            width: selectedRect.width * 0.8,
            transform: `translateX(calc(${
              selectedRect.left - navRect.left
            }px + 10%))`,
            opacity: 1,
          }
        : { opacity: 0 },
    config: {
      duration: 150,
      easing: easings.easeOutCubic,
    },
  });

  return (
    <nav
      ref={navRef}
      className="flex flex-shrink-0 justify-center items-center relative z-0 py-2"
      onPointerLeave={onLeaveTabs}
    >
      {tabs.map((item, i) => {
        return (
          <button
            key={i}
            className={classNames(
              "text-md relative rounded-md flex items-center h-8 px-4 z-20 bg-transparent text-sm text-slate-500 cursor-pointer select-none transition-colors",
              {
                "text-slate-700":
                  hoveredTabIndex === i || selectedTabIndex === i,
              }
            )}
            ref={(el) => (buttonRefs[i] = el)}
            onPointerEnter={() => onEnterTab(i)}
            onFocus={() => onEnterTab(i)}
            onClick={() => onSelectTab(i)}
          >
            {item.label}
          </button>
        );
      })}
      {bgTransition((styles) => (
        <animated.div
          className="absolute z-10 rounded-md top-0 left-0 bg-gray-200"
          style={styles}
        />
      ))}

      <animated.div
        className="absolute bottom-0 left-0 z-10 h-0.5 bg-slate-500"
        style={underlineStyles}
      />
    </nav>
  );
};

const Content = ({
  selectedTabIndex,
  direction,
  tabs,
  className,
}: {
  selectedTabIndex: number;
  direction: number;
  tabs: Tab[];

  className?: string;
}): JSX.Element => {
  const transitions = useTransition(selectedTabIndex, {
    exitBeforeEnter: false,
    keys: null,
    from: {
      opacity: 0,
      transform: `translate3d(${
        direction > 0 ? "100" : "-100"
      }px,0,0) scale(0.8)`,
    },
    enter: { opacity: 1, transform: "translate3d(0px,0,0) scale(1)" },
    leave: {
      opacity: 0,
      transform: `translate3d(${
        direction > 0 ? "-100" : "100"
      }px,0,0) scale(0.8)`,
      position: "absolute",
    },
    config: {
      duration: 250,
      easing: easings.easeOutCubic,
    },
  });

  return transitions((styles, item) => (
    <animated.div key={selectedTabIndex} style={styles} className={className}>
      {tabs[item].children}
    </animated.div>
  ));
};

export const Spring = { Tabs, Content };
