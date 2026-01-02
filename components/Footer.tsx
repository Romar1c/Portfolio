export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="flex justify-center items-center h-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-indigo-50">
        <p>
          © {year} Romaric BARBAUD
        </p>
      </div>
    </footer>
  );
}
