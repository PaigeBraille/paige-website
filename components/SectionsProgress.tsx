import React from 'react';

const SectionsProgress: React.FC = () => {
  return (
    <div className="container max-w-md mx-auto my-10 px-4 py-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Learning Program Dashboard</h2>
      <div className="section mb-6">
        <h3 className="text-lg font-bold">Section 1: Basics</h3>
        <div className="progress h-8 bg-gray-300 rounded-full mb-3">
          <div className="progress-bar h-full bg-blue-500 text-white text-center leading-8" style={{ width: '60%' }}>60%</div>
        </div>
      </div>
      <div className="section mb-6">
        <h3 className="text-lg font-bold">Section 2: Intermediate</h3>
        <div className="progress h-8 bg-gray-300 rounded-full mb-3">
          <div className="progress-bar h-full bg-blue-500 text-white text-center leading-8" style={{ width: '40%' }}>40%</div>
        </div>
      </div>
      <div className="section mb-6">
        <h3 className="text-lg font-bold">Section 3: Advanced</h3>
        <div className="progress h-8 bg-gray-300 rounded-full mb-3">
          <div className="progress-bar h-full bg-blue-500 text-white text-center leading-8" style={{ width: '80%' }}>80%</div>
        </div>
      </div>
      <div className="section mb-6">
        <h3 className="text-lg font-bold">Section 4: Expert</h3>
        <div className="progress h-8 bg-gray-300 rounded-full mb-3">
          <div className="progress-bar h-full bg-blue-500 text-white text-center leading-8" style={{ width: '20%' }}>20%</div>
        </div>
      </div>
    </div>
  );
};

export default SectionsProgress;
