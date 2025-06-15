export async function rateTeam(req) {
    const res = await fetch('/api/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
    });
    if (!res.ok)
        throw new Error('Failed to rate team');
    return res.json();
}
