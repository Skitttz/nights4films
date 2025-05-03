import React from 'react';

const Error = ({ error }) => {
  if (!error) return null;
  return (
    <p
      className={`animate-fadeIn text-red-700 font-bold text-sm mt-2 tm:text-xs`}
    >
      {error}
    </p>
  );
};

export default Error;
