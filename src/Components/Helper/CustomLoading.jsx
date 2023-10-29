import React from 'react';
import loading from '../../Assets/i-loading-custom.svg';

const CustomLoading = () => {
  return (
    <div className="block my-auto inset-0 items-center justify-center align-middle">
      <div>
        <img
          src={loading}
          alt=""
          className="animate-spin h-16 w-16 opacity-80 fill-blue-500"
        />
      </div>
    </div>
  );
};

export default CustomLoading;
