export default function NavBar({ current }) {
    const items = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/campaigns/new', label: 'New Campaign' },
    { to: '/calendar', label: 'Calendar' },
    { to: '/library', label: 'Library' },
    { to: '/settings', label: 'Settings' },
    ]
    return (
    <aside className="sidebar">
    <div className="brand">MarketMind <b>AI Hub</b></div>
    <div className="small">v0.1 — minimal UI</div>
    <nav className="nav">
    {items.map((it) => (
    <a key={it.to} href={`#${it.to}`} className={current === it.to ? 'active' : ''}>
    {it.label}
    </a>
    ))}
    </nav>
    </aside>
    )
    }