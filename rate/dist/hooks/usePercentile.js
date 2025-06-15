import { useState } from 'react';
export function usePercentile(initial = 0) {
    const [percentile, setPercentile] = useState(initial);
    const update = (p) => setPercentile(p);
    return [percentile, update];
}
