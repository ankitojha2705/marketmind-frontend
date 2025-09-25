import { useState } from 'react'
import { createCampaign } from '../store/db.js'


const allPlatforms = ['instagram', 'tiktok', 'facebook', 'linkedin']


export default function CampaignNew() {
const [name, setName] = useState('Summer Sale')
const [brief, setBrief] = useState('Promote 20% off storewide next week')
const [platforms, setPlatforms] = useState(['instagram', 'tiktok'])


const togglePlatform = (p) => {
setPlatforms((list) => list.includes(p) ? list.filter(x => x !== p) : [...list, p])
}


const generateDrafts = () => {
if (!name.trim() || !brief.trim() || platforms.length === 0) {
alert('Please enter a name, brief, and select at least one platform.')
return
}
createCampaign({ name: name.trim(), brief: brief.trim(), platforms })
window.location.hash = '#/dashboard'
}


return (
<div className="grid" style={{maxWidth: 760}}>
<section className="panel">
<h2>Create Campaign</h2>
<div>
<label className="label">Name</label>
<input className="input" value={name} onChange={e=>setName(e.target.value)} />
</div>
<div style={{marginTop:12}}>
<label className="label">Brief</label>
<textarea className="input" rows="4" value={brief} onChange={e=>setBrief(e.target.value)} />
</div>
<div style={{marginTop:12}}>
<label className="label">Platforms</label>
<div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
{allPlatforms.map(p => (
<button key={p} className={`btn ${platforms.includes(p) ? 'primary' : ''}`} onClick={()=>togglePlatform(p)}>
{p}
</button>
))}
</div>
</div>
<div style={{marginTop:16, display:'flex', gap:8}}>
<a className="btn" href="#/dashboard">Cancel</a>
<button className="btn primary" onClick={generateDrafts}>Generate Drafts</button>
</div>
</section>
</div>
)
}