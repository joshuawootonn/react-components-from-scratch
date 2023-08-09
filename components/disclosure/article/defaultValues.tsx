import { ReactNode } from "react";

export type FAQ = { question: string; answer: ReactNode };

export const defaultFAQs: FAQ[] = [
  {
    question: "Where do you learn to make ice cream?",
    answer: (
      <div>
        Sundae School
        <br />
        <br />
        Extra text lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    ),
  },
  {
    question: "What’s Forrest Gump’s password?",
    answer: (
      <div>
        1forrest1
        <br />
        <br />
        Extra text lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit.
      </div>
    ),
  },
  {
    question: "How do you make holy water?",
    answer: (
      <div>
        You boil the hell out of it.
        <br />
        <br />
        Extra text lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    ),
  },
];
