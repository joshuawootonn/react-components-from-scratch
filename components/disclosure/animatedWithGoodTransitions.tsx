import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { content, Faq } from "lib/disclosure/types";
import { Less, More } from "./icons";

const Toggle = (props: Faq) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      className="flex flex-col text-left w-full bg-light p-3 rounded-lg"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="flex justify-between items-center w-full">
        <div className="text-2xl font-semibold">{props.title}</div>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isOpen ? "less" : "more"}
            initial={{
              rotate: isOpen ? -90 : 90,
            }}
            animate={{
              zIndex: 1,
              rotate: 0,
              transition: {
                type: "tween",
                duration: 0.15,
                ease: "circOut",
              },
            }}
            exit={{
              zIndex: 0,
              rotate: isOpen ? -90 : 90,
              transition: {
                type: "tween",
                duration: 0.15,
                ease: "circIn",
              },
            }}
          >
            {isOpen ? <Less /> : <More />}
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: {
                  duration: 0.4,
                },
                opacity: {
                  duration: 0.25,
                  delay: 0.15,
                },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  duration: 0.4,
                },
                opacity: {
                  duration: 0.25,
                },
              },
            }}
            key="test"
            className="text-lg font-light"
          >
            {props.description}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export const AnimateWithGoodTransition = () => {
  return (
    <div className="flex flex-col w-[400px] justify-center items-center space-y-7">
      {content.map((c, i) => (
        <Toggle key={i} {...c} />
      ))}
    </div>
  );
};
