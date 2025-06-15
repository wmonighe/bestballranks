import { useState } from 'react';
export function useStreak(initial = { streak: 0, lastDate: null }) {
    const [state, setState] = useState(initial);
    const increment = () => {
        const today = new Date().toDateString();
        setState(prev => {
            if (prev.lastDate === today)
                return prev;
            const nextStreak = prev.lastDate ? prev.streak + 1 : 1;
            return { streak: nextStreak, lastDate: today };
        });
    };
    return [state, increment];
}
