import React, { useEffect, useState } from 'react';
import { Team } from '../types';
import { fetchNextTeam } from '../api/fetchNextTeam';
import { rateTeam, Stats } from '../api/rateTeam';
import { RatingSummary } from './RatingSummary';

interface Props {
  initialTeam: Team;
  initialStats: Stats;
}

export const TeamRater = ({ initialTeam, initialStats }: Props) => {
  const [team, setTeam] = useState(initialTeam);
  const [nextTeam, setNextTeam] = useState<Team | null>(null);
  const [overlayStats, setOverlayStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetchNextTeam().then(setNextTeam).catch(() => {});
  }, []);

  const handleVote = async (rating: 'up' | 'down') => {
    try {
      const updated = await rateTeam({ teamId: team.id, rating });
      setOverlayStats(updated);
      if (nextTeam) {
        setTeam(nextTeam);
        fetchNextTeam().then(setNextTeam).catch(() => {});
      }
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {overlayStats && (
        <RatingSummary stats={overlayStats} onDismiss={() => setOverlayStats(null)} />
      )}
      <div className="overflow-hidden h-96 relative">
        <div className="absolute inset-0">
            {/* Render team info */}
            <div className="bg-white rounded-lg shadow p-4 h-full flex flex-col">
              <h2 className="text-xl font-bold mb-2 text-center">{team.name}</h2>
              <div className="flex-1 overflow-y-auto text-sm grid grid-cols-2 gap-2">
                {(['QB','RB','WR','TE'] as const).map(pos => (
                  <div key={pos}>
                    <p className="font-semibold mb-1">{pos}</p>
                    <ul className="space-y-1">
                      {team.players[pos].map(p => (
                        <li key={p} className="border rounded px-1">{p}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="flex justify-around mt-4">
                <button
                  onClick={() => handleVote('up')}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  👍
                </button>
                <button
                  onClick={() => handleVote('down')}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  👎
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
