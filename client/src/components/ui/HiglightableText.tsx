import React from 'react';

type Props = {
  text: string;
  terms: string[]; // list of terms to highlight (case-insensitive)
  onTermClick: (term: string) => void;
  className?: string;
};

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default function HighlightableText({ text, terms, onTermClick, className }: Props) {
  if (!text) return null;
  const sorted = [...terms].sort((a, b) => b.length - a.length).map(t => t.toLowerCase());
  if (sorted.length === 0) return <span className={className}>{text}</span>;

  const pattern = sorted.map(escapeRegExp).join('|');
  const regex = new RegExp(`\\b(${pattern})\\b`, 'gi');
  const parts = text.split(regex);

  const renderWithBreaks = (str: string, keyBase: string) => {
    const lines = str.split('\n');
    return lines.flatMap((line, i) => i === 0 ? [<span key={`${keyBase}-${i}`}>{line}</span>] : [<br key={`${keyBase}-br-${i}`} />, <span key={`${keyBase}-${i}`}>{line}</span>]);
  };

  return (
    <span className={className}>
      {parts.map((part, idx) => {
        if (!part) return null;
        const lower = part.toLowerCase();
        if (sorted.includes(lower)) {
          return (
            <span
              key={`term-${idx}`}
              className="glossary-term"
              onClick={() => onTermClick(lower)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') onTermClick(lower); }}
            >
              {part}
            </span>
          );
        }
        return <React.Fragment key={`txt-${idx}`}>{renderWithBreaks(part, `txt-${idx}`)}</React.Fragment>;
      })}
    </span>
  );
}