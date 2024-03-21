import React from "react";

const ProgressMenu: React.FC = () => {
  return (
    <div className="max-w-md mx-auto my-10 px-4 py-6 bg-white rounded-lg shadow-md">
      <h1 className="text-center text-2xl font-bold mb-6">
        Duolingo Learner Dashboard
      </h1>
      <div className="mb-4">
        <label className="font-bold">XP:</label>
        <span className="text-green-500 text-lg"> XXXXXX</span>
      </div>
      <div className="mb-4">
        <label className="font-bold">Time Spent:</label>
        <span className="text-green-500 text-lg"> XX hours XX minutes</span>
      </div>
      <div className="mb-4">
        <label className="font-bold">Days Active:</label>
        <span className="text-green-500 text-lg"> XX days</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="">Sun</div>
        <div className="">Mon</div>
        <div className="">Tue</div>
        <div className="">Wed</div>
        <div className="">Thu</div>
        <div className="">Fri</div>
        <div className="">Sat</div>
      </div>
    </div>
  );
};

export default ProgressMenu;
