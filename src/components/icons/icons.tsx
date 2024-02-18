import { h, JSX } from 'preact';

interface Props {
  size?: number;
}

export function IconComponent({ size = 24 }: Props): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M9.53782 8.45236L12 6L14.4622 8.45236L12 10.9047L9.53782 8.45236ZM8.45236 14.4633L6 12L8.45236 9.53782L10.9047 12L8.45236 14.4622V14.4633ZM14.4633 15.5476L12 18L9.53782 15.5476L12 13.0953L14.4622 15.5476H14.4633ZM18 12L15.5476 9.53782L13.0953 12L15.5476 14.4622L18 12Z"
        fill="#9747FF"
      />
    </svg>
  );
}
