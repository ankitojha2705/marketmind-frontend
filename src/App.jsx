import useHashRoute from './router/useHashRoute.js'
import NavBar from './components/NavBar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CampaignNew from './pages/CampaignNew.jsx'
import Calendar from './pages/Calendar.jsx'
import Library from './pages/Library.jsx'
import Settings from './pages/Settings.jsx'


export default function App() {
const { route } = useHashRoute()


let Page = Dashboard
if (route === '/dashboard') Page = Dashboard
else if (route === '/campaigns/new') Page = CampaignNew
else if (route === '/calendar') Page = Calendar
else if (route === '/library') Page = Library
else if (route === '/settings') Page = Settings


return (
<div className="app">
<NavBar current={route} />
<main>
<header className="header">
<div>MarketMind</div>
<div className="small">Simple build • No extra deps</div>
</header>
<div className="content">
<Page />
</div>
</main>
</div>
)
}