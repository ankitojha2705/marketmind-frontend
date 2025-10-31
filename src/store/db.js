// /src/store/db.js
const KEY = 'mm_state_v02'


function uid() {
return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)
}


const initial = {
  campaigns: [], // {id, name, brief, platforms, createdAt}
  drafts: [] // {id, campaignId, platform, caption, hashtags, status, scheduledAt}
};

// Initialize with sample data if empty
function initializeData() {
  const currentState = load();
  if (currentState.campaigns === undefined || currentState.drafts === undefined) {
    save(initial);
    return initial;
  }
  return currentState;
}


function load() {
try { return JSON.parse(localStorage.getItem(KEY)) || initial } catch { return initial }
}


function save(state) { localStorage.setItem(KEY, JSON.stringify(state)) }


let state = initializeData()
const listeners = new Set()


export function getState() { return state }
export function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn) }
function notify() { listeners.forEach((fn) => fn(state)) }


export function resetAll() { state = structuredClone(initial); save(state); notify() }


export function createCampaign({ name, brief, platforms }) {
  try {
    const id = uid();
    const campaign = { 
      id, 
      name, 
      brief, 
      platforms, 
      createdAt: new Date().toISOString() 
    };

    const newDrafts = platforms.map((p) => ({
      id: uid(),
      campaignId: id,
      platform: p,
      caption: `${name}: ${brief} — (${p})`,
      hashtags: ['#sale', '#trending'],
      status: 'draft',
      scheduledAt: null,
      createdAt: new Date().toISOString()
    }));

    // Update state immutably
    state = {
      ...state,
      campaigns: [...(state.campaigns || []), campaign],
      drafts: [...(state.drafts || []), ...newDrafts]
    };

    save(state);
    notify();
    return { campaign, drafts: newDrafts };
  } catch (error) {
    console.error('Error in createCampaign:', error);
    throw error;
  }
}


export function listCampaigns() { return state.campaigns }
export function listDrafts() { return state.drafts.filter(d => d.status === 'draft') }
export function listScheduled() { return state.drafts.filter(d => d.status === 'scheduled') }


export function scheduleDraft(id, isoString) {
const d = state.drafts.find(x => x.id === id)
if (!d) return false
d.status = 'scheduled'
d.scheduledAt = isoString
save(state); notify()
return true
}


export function unscheduleDraft(id) {
const d = state.drafts.find(x => x.id === id)
if (!d) return false
d.status = 'draft'
d.scheduledAt = null
save(state); notify()
return true
}