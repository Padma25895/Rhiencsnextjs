import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
  fill?: string;
  dotOpacity?: number | string;
  className?: string;
  circleClassName?: string;
};

export default function DotGridIcon({
  width = 24,
  height = 23,
  fill = "#535353",
  dotOpacity = 0.5,
  className,
  circleClassName,
  ...props
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle className={circleClassName} cx="16.0004" cy="4.80001" r="1.6" fill={fill} opacity={dotOpacity} />
      <circle className={circleClassName} cx="12.7992" cy="1.6" r="1.6" fill={fill} opacity={dotOpacity} />
      <circle className={circleClassName} cx="22.4008" cy="11.2" r="1.6" fill={fill} opacity={dotOpacity} />
      <circle className={circleClassName} cx="1.6" cy="11.2" r="1.6" fill={fill} opacity={dotOpacity} />
      <circle className={circleClassName} cx="6.40078" cy="11.2" r="1.6" fill={fill} opacity={dotOpacity} />
      <circle className={circleClassName} cx="11.1996" cy="11.2" r="1.6" fill={fill} opacity={dotOpacity} />
      <circle className={circleClassName} cx="16.0004" cy="11.2" r="1.6" fill={fill} opacity={dotOpacity} />
      <circle className={circleClassName} cx="19.1996" cy="14.4" r="1.6" fill={fill} opacity={dotOpacity} />
      <circle className={circleClassName} cx="16.0004" cy="17.6" r="1.6" fill={fill} opacity={dotOpacity} />
      <circle className={circleClassName} cx="12.7992" cy="20.8" r="1.6" fill={fill} opacity={dotOpacity} />
      <circle className={circleClassName} cx="19.1996" cy="8.00002" r="1.6" fill={fill} opacity={dotOpacity} />
    </svg>
  );
}
