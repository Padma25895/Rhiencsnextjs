import React from 'react';

type Props = React.SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
  stroke?: string;
};

export default function ArrowUpIcon({ width = 45, height = 45, stroke = '#008080', ...props }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M27.0566 11.1188L38.4379 22.5L27.0566 33.8813"
        stroke={stroke}
        strokeWidth={1.125}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5625 22.5H38.1188"
        stroke={stroke}
        strokeWidth={1.125}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
