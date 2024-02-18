import { RefObject, h } from 'preact';
import { ReactNode } from 'preact/compat';
import { useRef, useState } from 'preact/hooks';
import Tooltip from '../tooltip';

interface Props {
  label: string;
  icon: ReactNode;
  onChange: (checked: boolean) => void;
  tooltip?: string;
}

export default function IconChip({ label, icon, onChange, tooltip }: Props) {
  const [checked, setChecked] = useState(false);
  const inputRef: RefObject<HTMLInputElement> = useRef(null);

  const handleInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setChecked(target.checked);
    if (onChange) {
      onChange(target.checked);
    }

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <label
      htmlFor={label.replace(/[^a-zA-Z0-9-_]/g, '')}
      className="group relative aspect-square rounded-sm duration-150 focus-within:bg-bg-secondary"
    >
      <input
        id={label.replace(/[^a-zA-Z0-9-_]/g, '')}
        type="checkbox"
        className="sr-only"
        checked={checked}
        ref={inputRef}
        onChange={handleInputChange}
      />
      <span
        className={`flex items-center justify-center gap-1 duration-150 
        ${
          checked
            ? 'bg-bg-brand text-text-onbrand group-hover:bg-bg-brand-pressed'
            : 'text-text-tertiary group-hover:bg-bg-secondary'
        }
            `}
      >
        {icon}
      </span>
      {tooltip && (
        <div className="absolute hidden w-full group-focus-within:inline-block group-hover:inline-block">
          <Tooltip text={tooltip} position="right" />
        </div>
      )}
    </label>
  );
}
