import { useAuth } from "../context/AuthContext.jsx";

const navByRole = {
  student: ["Dashboard", "Profile", "Jobs", "Applications", "Interviews", "Notifications"],
  company: ["Dashboard", "Profile", "Jobs", "Applications", "Interviews"],
  tpo: ["Dashboard", "Students", "Companies", "Jobs", "Applications", "Interviews", "Reports", "Notifications"]
};

export function Layout({ activeView, setActiveView, children }) {
  const { user, logout } = useAuth();
  const nav = navByRole[user?.role || "tpo"];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#">
          <span className="brand-mark">S</span>
          <span>
            <strong>SmartPlacify</strong>
            <small>Smarter Placements. Brighter Futures.</small>
          </span>
        </a>
        <nav className="nav-list">
          {nav.map((item) => (
            <button key={item} className={activeView === item ? "active" : ""} onClick={() => setActiveView(item)}>
              <span>◇</span> {item}
            </button>
          ))}
        </nav>
        <section className="side-card">
          <div className="mini-mountains" />
          <strong>Better Placements Through Smarter Tech</strong>
        </section>
        <section className="profile-card">
          <span className="avatar">{user?.name?.slice(0, 2).toUpperCase() || "SP"}</span>
          <span>
            <strong>{user?.name}</strong>
            <small>{user?.role?.toUpperCase()}</small>
          </span>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </section>
      </aside>
      <main className="dashboard">{children}</main>
    </div>
  );
}
