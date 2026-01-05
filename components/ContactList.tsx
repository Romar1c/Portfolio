type ContactItem = {
  label: string;
  value: string;
  href?: string;
};

type ContactListProps = {
  items: ContactItem[];
};

export function ContactList({ items }: ContactListProps) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-indigo-50"
        >
          <span className="text-xs uppercase tracking-[0.15em] text-indigo-200/80">
            {item.label}
          </span>
          {item.href ? (
            <a
              className="font-semibold text-indigo-50 underline-offset-4 hover:text-white hover:underline"
              href={item.href}
            >
              {item.value}
            </a>
          ) : (
            <span className="font-semibold text-indigo-50">{item.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}
