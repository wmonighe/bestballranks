import React, { useEffect, useState } from 'react';
import { fetchNextTeam } from '../api/fetchNextTeam';
import { rateTeam } from '../api/rateTeam';
import { useXP, XP_PER_RATING } from '../hooks/useXP';
import { useStreak } from '../hooks/useStreak';
import { RatingOverlay } from './RatingOverlay';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
export const TeamRater = ({ initialTeam, initialStats }) => {
    const [team, setTeam] = useState(initialTeam);
    const [nextTeam, setNextTeam] = useState(null);
    const [overlayStats, setOverlayStats] = useState(null);
    const [xpState, addXP] = useXP(initialStats.xp);
    const [streakState, incStreak] = useStreak({ streak: initialStats.streak, lastDate: null });
    useEffect(() => {
        fetchNextTeam().then(setNextTeam).catch(() => { });
    }, []);
    const handleVote = async (rating) => {
        try {
            const updated = await rateTeam({ teamId: team.id, rating });
            addXP(XP_PER_RATING);
            incStreak();
            setOverlayStats(updated);
            if (nextTeam) {
                setTeam(nextTeam);
                fetchNextTeam().then(setNextTeam).catch(() => { });
            }
            toast.success('Rating submitted');
        }
        catch (err) {
            toast.error('Error submitting rating');
        }
    };
    return (React.createElement("div", { className: "relative w-full max-w-lg mx-auto" },
        React.createElement(AnimatePresence, null, overlayStats && (React.createElement(RatingOverlay, { stats: overlayStats, onDismiss: () => setOverlayStats(null) }))),
        React.createElement("div", { className: "overflow-hidden h-96 relative" },
            React.createElement(AnimatePresence, { initial: false, custom: team.id },
                React.createElement(motion.div, { key: team.id, initial: { x: 300, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -300, opacity: 0 }, transition: { type: 'spring', stiffness: 300, damping: 30 }, className: "absolute inset-0" },
                    React.createElement("div", { className: "bg-white rounded-lg shadow p-4 h-full flex flex-col" },
                        React.createElement("h2", { className: "text-xl font-bold mb-2 text-center" }, team.name),
                        React.createElement("div", { className: "flex-1 overflow-y-auto text-sm grid grid-cols-2 gap-2" }, ['QB', 'RB', 'WR', 'TE'].map(pos => (React.createElement("div", { key: pos },
                            React.createElement("p", { className: "font-semibold mb-1" }, pos),
                            React.createElement("ul", { className: "space-y-1" }, team.players[pos].map(p => (React.createElement("li", { key: p, className: "border rounded px-1" }, p)))))))),
                        React.createElement("div", { className: "flex justify-around mt-4" },
                            React.createElement("button", { onClick: () => handleVote('up'), className: "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" }, "\uD83D\uDC4D"),
                            React.createElement("button", { onClick: () => handleVote('down'), className: "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" }, "\uD83D\uDC4E"))))))));
};
