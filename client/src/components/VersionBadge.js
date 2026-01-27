import React from 'react';

const VersionBadge = () => {
  const version = 'v1.2.0'; // Update this with each release

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-1.5 shadow-lg">
        <span className="text-xs font-semibold text-gray-700">{version}</span>
      </div>
    </div>
  );
};

export default VersionBadge;
