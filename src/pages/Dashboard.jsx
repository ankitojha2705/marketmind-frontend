export default function Dashboard() {
    return (
    <div className="grid cols-3">
    <section className="panel">
    <h2>Upcoming Posts</h2>
    <p className="small">No posts scheduled yet. Create a campaign to get started.</p>
    </section>
    <section className="panel">
    <h2>Drafts</h2>
    <p className="small">Your drafts will appear here after generation.</p>
    </section>
    <section className="panel">
    <h2>Performance (7d)</h2>
    <p className="small">Impressions: — • Clicks: — • ER: —</p>
    </section>
    </div>
    )
    }