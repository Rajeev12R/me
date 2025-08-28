import React from "react";

const Available = () => {

  return (
    <div className="fixed top-6 left-6 flex flex-col gap-4 items-center z-50">
      <div className="max-w-lg mx-auto pr-4 pl-1 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-2 shadow-sm">
        <span className="bg-green-300 font-medium size-2 rounded-full"></span>
        <span className="text-sm text-white/80">
          Available for Hire
        </span>
      </div>

    </div>
  );
};

export default Available;
