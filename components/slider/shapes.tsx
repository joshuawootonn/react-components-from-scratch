import { ComponentPropsWithoutRef } from "react";

type ShapeProps = ComponentPropsWithoutRef<"svg">;

export function Circle(props: ShapeProps) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 340 340"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M340 170C340 263.888 263.888 340 170 340C76.1116 340 0 263.888 0 170C0 76.1116 76.1116 0 170 0C263.888 0 340 76.1116 340 170Z" />
    </svg>
  );
}

export function Square(props: ShapeProps) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 412 412"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="211.48"
        y="-6"
        width="300"
        height="300"
        rx="15"
        transform="rotate(46.4634 211.48 -6)"
      />
    </svg>
  );
}

export function Triangle(props: ShapeProps) {
  return (
    <svg
      width="100"
      height="104"
      viewBox="0 0 349 364"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M328.852 1.79834C339.737 -2.05613 350.712 7.31786 348.608 18.6715L287.058 350.766C284.954 362.119 271.348 366.937 262.568 359.438L5.74062 140.087C-3.03979 132.588 -0.409476 118.396 10.4752 114.542L328.852 1.79834Z" />
    </svg>
  );
}
