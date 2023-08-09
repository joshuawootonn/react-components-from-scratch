import classNames from "clsx";
import { useState, ReactNode } from "react";

import { defaultFAQs } from "./defaultValues";

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
        <div className="text-xl font-semibold text-left">{props.title}</div>
        <div>Svg Placeholder</div>
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
