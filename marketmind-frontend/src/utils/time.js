// /src/utils/time.js
export function nowPlusHours(h = 24) {
    const d = new Date(); d.setHours(d.getHours() + h); return d
    }
    export function toISO(d) { return new Date(d).toISOString() }
    export function nice(dt) {
    const d = new Date(dt)
    return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    }