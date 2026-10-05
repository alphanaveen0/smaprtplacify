export function Topbar({ search, setSearch, unreadCount = 0 }) {
  return (
    <header className="topbar">
      <label className="search">
        <span>⌕</span>
        <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search students, companies, jobs..." />
        <kbd>⌘ K</kbd>
      </label>
      <div className="top-actions">
        <button aria-label="Notifications">♢<sup>{unreadCount}</sup></button>
        <button aria-label="Theme">☼</button>
      </div>
    </header>
  );
}
