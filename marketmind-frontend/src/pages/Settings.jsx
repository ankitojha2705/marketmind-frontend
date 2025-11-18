// /src/pages/Settings.jsx
import { resetAll } from '../store/db.js'


export default function Settings() {
return (
<section className="panel">
<h2>Settings</h2>
<ul className="small">
<li>Brand Kit (colors, fonts)</li>
<li>Integrations</li>
<li>Team</li>
</ul>
<hr />
<button className="btn" onClick={resetAll}>Reset demo data</button>
</section>
)
}