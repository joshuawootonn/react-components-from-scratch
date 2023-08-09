import classNames from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState, ReactNode } from "react";

import { defaultFAQs } from "./defaultValues";
import { Less, More } from "./svgs";

type Props = {
  title: string;
  body: ReactNode;
};

const Disclosure = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="flex flex-col text-left w-full bg-[#EFEFEF] p-3 rounded-lg"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <button
        aria-controls={props.title}
        aria-expanded={isOpen}
        className="flex justify-between items-center w-full space-x-4"
      >
        <div className="text-xl font-semibold">{props.title}</div>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isOpen ? "minus" : "plus"}
            initial={{
              rotate: isOpen ? -90 : 90,
            }}
            animate={{
              rotate: 0,
              transition: {
                type: "tween",
                duration: 0.15,
                ease: "circOut",
              },
            }}
            exit={{
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
      </button>
      <div
        id={props.title}
        className={classNames("font-light", isOpen ? "block" : "hidden")}
      >
        {props.body}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="flex flex-col w-full p-5 justify-center items-center space-y-7">
      {defaultFAQs.map((faq, i) => (
        <Disclosure key={i} title={faq.question} body={faq.answer} />
      ))}
    </div>
  );
}
