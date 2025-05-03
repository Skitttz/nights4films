import React from 'react';
import loading from '../../assets/i-loading.svg';

const Loading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div>
        <img
          src={loading}
          alt=""
          className="animate-spin h-16 w-16 opacity-80"
        />
      </div>
    </div>
  );
};

export default Loading;
