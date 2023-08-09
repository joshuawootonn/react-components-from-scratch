import { AnimatePresence, motion } from "framer-motion";
import { Faq, content } from "lib/disclosure/types";
import { useState } from "react";
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={{
              initial: {
                height: 0,
              },
              animate: {
                height: "auto",
                transition: {
                  when: "beforeChildren",
                },
              },
              exit: {
                height: 0,
                transition: {
                  when: "afterChildren",
                },
              },
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            key="test"
            className="text-lg font-light"
          >
            <motion.div
              variants={{
                initial: {
                  opacity: 0,
                },
                animate: {
                  opacity: 1,
                },
                exit: {
                  opacity: 0,
                },
              }}
            >
              {props.description}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export const AnimatedWithStagger = () => {
  return (
    <div className="flex flex-col w-[400px] justify-center items-center space-y-7">
      {content.map((c, i) => (
        <Toggle key={i} {...c} />
      ))}
    </div>
  );
};
