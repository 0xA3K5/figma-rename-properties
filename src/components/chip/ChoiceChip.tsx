import { h } from 'preact';
import { useState } from 'preact/hooks';

interface Props {
  label: string;
  onChange: (checked: boolean) => void;
}

export default function ChoiceChip({ label, onChange }: Props) {
  const [checked, setChecked] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (event: any) => {
    setChecked(event.target.checked);
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <label htmlFor={label} className="inline-flex cursor-pointer items-center">
      <input
        id={label}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={handleInputChange}
      />
      <span
        className={`flex flex-grow-0 items-center gap-1 rounded-md border border-border px-2 py-1 text-xs duration-200 ${
          checked ? 'bg-bg-inverse text-text-oninverse' : 'text-text'
        }`}
      >
        {label}
      </span>
    </label>
  );
}
