import { useEffect, useState } from 'react'
import { listDrafts, listScheduled, subscribe, scheduleDraft } from '../store/db.js'
import { nowPlusHours, toISO, nice } from '../utils/time.js'


export default function Dashboard() {
const [drafts, setDrafts] = useState(listDrafts())
const [scheduled, setScheduled] = useState(listScheduled())


useEffect(() => {
const unsub = subscribe(() => {
setDrafts(listDrafts())
setScheduled(listScheduled())
})
return unsub
}, [])


const scheduleIn24h = (id) => {
const when = toISO(nowPlusHours(24))
scheduleDraft(id, when)
}


return (
<div className="grid cols-3">
<section className="panel">
<h2>Upcoming Posts</h2>
{scheduled.length === 0 ? (
<p className="small">No posts scheduled yet.</p>
) : (
<table className="table">
<thead><tr><th>When</th><th>Platform</th><th>Caption</th></tr></thead>
<tbody>
{scheduled.map(s => (
<tr key={s.id}><td>{nice(s.scheduledAt)}</td><td><span className="badge">{s.platform}</span></td><td className="small">{s.caption}</td></tr>
))}
</tbody>
</table>
)}
</section>


<section className="panel">
<h2>Drafts</h2>
{drafts.length === 0 ? (
<p className="small">Your drafts will appear here after generation.</p>
) : (
<div className="grid" style={{gap:12}}>
{drafts.map(d => (
<div key={d.id} className="panel" style={{padding:12}}>
<div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
<span className="badge">{d.platform}</span>
<button className="btn" onClick={() => scheduleIn24h(d.id)}>Schedule +24h</button>
</div>
<div className="small" style={{marginTop:8}}>{d.caption}</div>
<div className="small" style={{marginTop:6}}>{d.hashtags.join(' ')}</div>
</div>
))}
</div>
)}
</section>


<section className="panel">
<h2>Performance (7d)</h2>
<p className="small">Impressions: — • Clicks: — • ER: —</p>
</section>
</div>
)
}