export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div>
        <p>
          © {year} Romaric BARBAUD
        </p>
      </div>
    </footer>
  );
}
