import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import React, { useEffect, useState } from 'react';
import { BADGES } from '../constants/gamification';
export const RatingOverlay = ({ stats, onDismiss }) => {
    const [showConfetti, setShowConfetti] = useState(false);
    const badge = BADGES.find(b => b.threshold === stats.teamsRated);
    useEffect(() => {
        let timer = setTimeout(onDismiss, 1000);
        if (badge) {
            setShowConfetti(true);
            timer = setTimeout(() => {
                setShowConfetti(false);
                onDismiss();
            }, 1200);
        }
        return () => clearTimeout(timer);
    }, [onDismiss, badge]);
    return (React.createElement(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "absolute inset-0 bg-black/50 flex items-center justify-center z-20" },
        showConfetti && React.createElement(Confetti, { recycle: false, numberOfPieces: 200 }),
        React.createElement("div", { className: "bg-white rounded-lg p-4 shadow-lg text-center w-64" },
            React.createElement("p", { className: "font-semibold mb-2" }, "Thanks for rating!"),
            React.createElement("div", { className: "text-sm space-y-1" },
                React.createElement("p", null,
                    "Teams Rated: ",
                    stats.teamsRated),
                React.createElement("p", null,
                    "Streak: ",
                    stats.streak,
                    " \uD83D\uDD25"),
                React.createElement("div", { className: "w-full bg-gray-200 rounded h-2 overflow-hidden" },
                    React.createElement(motion.div, { className: "bg-green-500 h-2", initial: { width: 0 }, animate: { width: `${(stats.xp / 100) * 100}%` } })),
                React.createElement("p", null,
                    "Level ",
                    stats.level),
                React.createElement("p", null,
                    "Top ",
                    stats.percentile,
                    "% today")),
            badge && React.createElement("p", { className: "mt-2 font-bold" },
                "Unlocked: ",
                badge.name))));
};
