import { h, JSX } from 'preact';

interface Props {
  size?: number;
}

export function IconTarget({ size = 24 }: Props): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5625 10.25V7.64687C9.49575 7.85162 7.8525 9.49575 7.64687 11.5625H10.25V12.4375H7.64687C7.85162 14.5042 9.49575 16.1475 11.5625 16.3531V13.75H12.4375V16.3531C14.5042 16.1484 16.1475 14.5042 16.3531 12.4375H13.75V11.5625H16.3531C16.1484 9.49575 14.5042 7.8525 12.4375 7.64687V10.25H11.5625ZM17.2325 11.5625C17.0216 9.01188 14.9881 6.97838 12.4375 6.7675V5H11.5625V6.7675C9.01188 6.97838 6.97838 9.01188 6.7675 11.5625H5V12.4375H6.7675C6.97838 14.9881 9.01188 17.0216 11.5625 17.2325V19H12.4375V17.2325C14.9881 17.0216 17.0216 14.9881 17.2325 12.4375H19V11.5625H17.2325Z"
        fill="currentColor"
      />
    </svg>
  );
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
