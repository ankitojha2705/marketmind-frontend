import { useEffect, useState } from 'react'


function normalize(hash) {
if (!hash || hash === '#' || hash === '#/') return '/dashboard'
return hash.replace(/^#/, '')
}


export default function useHashRoute() {
const [route, setRoute] = useState(normalize(window.location.hash))


useEffect(() => {
const onHashChange = () => setRoute(normalize(window.location.hash))
window.addEventListener('hashchange', onHashChange)
if (!window.location.hash) window.location.hash = '#/dashboard'
return () => window.removeEventListener('hashchange', onHashChange)
}, [])


const navigate = (to) => { window.location.hash = `#${to}` }
return { route, navigate }
}