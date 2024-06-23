import React from "react";

const LoadMoreData = ({ state, fetchDataFunc }) => {
  if (state !== null && state.totalDocs > state.result.length) {
    return (
      <button
        className="text-dark-grey p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2"
        onClick={() => fetchDataFunc({ page: state.page + 1 })}
      >
        LoadMoreData
      </button>
    );
  }
};

export default LoadMoreData;
