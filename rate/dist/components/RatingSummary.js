import React from 'react';
export const RatingSummary = ({ stats, onDismiss }) => (
  React.createElement("div", { className: "absolute inset-0 bg-black/50 flex items-center justify-center z-20", onClick: onDismiss },
    React.createElement("div", { className: "bg-white rounded-lg p-4 shadow-lg text-center w-64" },
      React.createElement("p", { className: "font-semibold mb-2" }, "Thanks for rating!"),
      React.createElement("p", null, "Teams Rated: ", stats.teamsRated)
    )
  )
);
