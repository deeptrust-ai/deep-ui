import type { LogoGraphicProps } from './types';

const Icon = ({ baseWidth, baseHeight, viewBoxMinX, width, height }: LogoGraphicProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`${viewBoxMinX} 0 ${baseWidth} ${baseHeight}`}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#a)">
        <path
          fill="url(#b)"
          d="M.786 0H20.9c.434 0 .786.34.786.76v1.117H0V.76C0 .34.352 0 .786 0Z"
        />
        <path fill="url(#c)" d="M21.686 3.825H0V5.7h21.686V3.825Z" />
        <path fill="url(#d)" d="M21.686 15.298H0v1.877h21.686v-1.877Z" />
        <path
          fill="url(#e)"
          d="M0 19.123h21.686v1.116c0 .42-.352.76-.786.76H.786A.774.774 0 0 1 0 20.24v-1.116Z"
        />
        <path fill="url(#f)" d="M9.138 7.65H0v1.876h9.138V7.65Z" />
        <path fill="url(#g)" d="M21.686 7.65h-9.138v1.876h9.138V7.65Z" />
        <path fill="url(#h)" d="M9.138 11.474H0v1.877h9.138v-1.877Z" />
        <path fill="url(#i)" d="M21.686 11.474h-9.138v1.877h9.138v-1.877Z" />
      </g>
      <defs>
        <linearGradient
          id="b"
          x1="10.843"
          x2="10.843"
          y1="0"
          y2="1.877"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".215" stopColor="#5DB0FE" />
          <stop offset=".828" stopColor="#008CF9" />
        </linearGradient>
        <linearGradient
          id="c"
          x1="10.843"
          x2="10.843"
          y1="3.825"
          y2="5.701"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".215" stopColor="#5DB0FE" />
          <stop offset=".828" stopColor="#008CF9" />
        </linearGradient>
        <linearGradient
          id="d"
          x1="10.843"
          x2="10.843"
          y1="15.298"
          y2="17.175"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".215" stopColor="#5DB0FE" />
          <stop offset=".828" stopColor="#008CF9" />
        </linearGradient>
        <linearGradient
          id="e"
          x1="10.843"
          x2="10.843"
          y1="19.123"
          y2="21"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".215" stopColor="#5DB0FE" />
          <stop offset=".828" stopColor="#008CF9" />
        </linearGradient>
        <linearGradient
          id="f"
          x1="4.569"
          x2="4.569"
          y1="7.649"
          y2="9.526"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".215" stopColor="#5DB0FE" />
          <stop offset=".828" stopColor="#008CF9" />
        </linearGradient>
        <linearGradient
          id="g"
          x1="17.117"
          x2="17.117"
          y1="7.649"
          y2="9.526"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".215" stopColor="#5DB0FE" />
          <stop offset=".828" stopColor="#008CF9" />
        </linearGradient>
        <linearGradient
          id="h"
          x1="4.569"
          x2="4.569"
          y1="11.474"
          y2="13.351"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".215" stopColor="#5DB0FE" />
          <stop offset=".828" stopColor="#008CF9" />
        </linearGradient>
        <linearGradient
          id="i"
          x1="17.117"
          x2="17.117"
          y1="11.474"
          y2="13.351"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".215" stopColor="#5DB0FE" />
          <stop offset=".828" stopColor="#008CF9" />
        </linearGradient>
        <clipPath id="a">
          <rect width={baseWidth} height={baseHeight} fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Icon;
