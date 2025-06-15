import React from 'react';
import { Stats } from '../api/rateTeam';

interface Props {
  stats: Stats;
  onDismiss: () => void;
}

export const RatingSummary = ({ stats, onDismiss }: Props) => {
  return (
    <div
      className="absolute inset-0 bg-black/50 flex items-center justify-center z-20"
      onClick={onDismiss}
    >
      <div className="bg-white rounded-lg p-4 shadow-lg text-center w-64">
        <p className="font-semibold mb-2">Thanks for rating!</p>
        <p>Teams Rated: {stats.teamsRated}</p>
      </div>
    </div>
  );
};
