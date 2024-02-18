import { h, JSX } from 'preact';

interface Props {
  text: string[];
  searchKey: string;
  replace: string;
}

export default function HighlightedText({
  text,
  searchKey,
  replace,
}: Props): JSX.Element {
  const regex = new RegExp(`(${searchKey})`, 'gi');

  return (
    <span className="flex flex-wrap text-sm">
      {text.map((t) => (
        <span key={t} className="mr-2 flex last:mr-0">
          {t.split(regex).map((part) =>
            regex.test(part) ? (
              <span key={part} className="font-medium opacity-100">
                {replace ? (
                  <span className="line-through opacity-60">{part}</span>
                ) : (
                  part
                )}
                {replace}
              </span>
            ) : (
              <span key={part} className="opacity-60">
                {part}
              </span>
            )
          )}
        </span>
      ))}
    </span>
  );
}
