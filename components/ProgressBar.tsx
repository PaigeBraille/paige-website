import React from "react";

type ProgressBarProps = {
  currentLevel: number;
  totalLevels: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentLevel,
  totalLevels,
}) => {
  // Calculate the progress percentage
  const progress = (currentLevel / totalLevels) * 100;

  return (
    <div className="w-full h-4 my-6 rounded-full">
      <div
        className="h-4 rounded-full bg-primary"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
