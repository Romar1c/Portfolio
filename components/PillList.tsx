type PillListProps = {
  items: string[];
  emptyLabel: string;
};

export function PillList({ items, emptyLabel }: PillListProps) {
  if (!items || items.length === 0) {
    return <p className="mt-2 text-sm text-indigo-100/70">{emptyLabel}</p>;
  }

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-indigo-500/20 bg-indigo-500/15 px-3 py-1 text-sm text-indigo-50"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
