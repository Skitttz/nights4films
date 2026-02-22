import React from 'react';

const FilmCardLoading = () => {
  const filmCardItems = Array.from({ length: 9 }, () => crypto.randomUUID());

  return (
    <>
      {filmCardItems.map((id) => (
        <div
          key={id}
          className="p-3 cardMD:pt-5 cardMD:pb-6 cardMD:w-[10.5rem] cardMD:ml-2 cardMD:flex-shrink-0"
        >
          <div className="rounded-2xl transition ease-in-out delay-600 hover:shadow-[0px_1px_12px_4px_rgba(130,166,237,0.1)] hover:border border-sky-200 border-opacity-10 hover:scale-110 animate-pulse bg-gray-800 w-[153px] h-[220.5px]" />
        </div>
      ))}
    </>
  );
};

export default FilmCardLoading;
