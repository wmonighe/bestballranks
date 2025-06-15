export async function fetchNextTeam() {
    const res = await fetch('/api/nextTeam');
    if (!res.ok)
        throw new Error('Failed to load next team');
    return res.json();
}
