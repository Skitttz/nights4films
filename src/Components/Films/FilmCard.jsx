import React from 'react';

const FilmCard = ({
  title,
  index,
  id,
  image,
  onClick,
  width,
  height,
  setFilmId,
  searchValue,
  isActive,
}) => {
  const activeIndex = index === isActive;
  const lowerSearchValue = searchValue.toLowerCase();
  const ilgatch = title.toLowerCase().includes(lowerSearchValue);
  if (searchValue && searchValue.length > 1 && !ilgatch) {
    return null;
  }

  return (
    <div className={`p-3 cardMD:w-[10.5rem] cardMD:ml-2 cardMD:flex-shrink-0`}>
      <img
        onClick={() => {
          onClick(index);
          setFilmId(id);
        }}
        className={`rounded-2xl transition ease-in-out delay-600 hover:shadow-[0px_1px_12px_4px_rgba(130,166,237,0.1)] hover:border border-sky-200 border-opacity-10 hover:scale-110 	${
          activeIndex
            ? 'active animate-scaleCard shadow-[0px_1px_12px_4px_rgba(130,166,237,0.1)] border'
            : ' '
        }`}
        src={image}
        alt={title}
        style={{
          width: `${(width - 60) * 0.9}px`,
          height: `${(height - 100) * 0.9}px`,
          cursor: 'pointer',
        }}
      />
    </div>
  );
};

export default FilmCard;
