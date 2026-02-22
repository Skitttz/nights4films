import React from 'react';

interface ErrorProps {
  error: string | null;
}

const Error = ({ error }: ErrorProps) => {
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
