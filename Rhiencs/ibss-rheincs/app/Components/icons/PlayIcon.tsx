import React from 'react';

type Props = React.SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
};

export default function PlayIcon({ width = 76, height = 76, ...props }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 76 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.25 38V29.6563C19.25 19.3125 26.5938 15.0625 35.5625 20.25L42.7813 24.4375L50 28.625C58.9688 33.8125 58.9688 42.2813 50 47.4687L42.7813 51.6563L35.5625 55.8437C26.5938 60.9375 19.25 56.7187 19.25 46.3438V38Z"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
