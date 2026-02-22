import React from 'react';

interface FilmCardProps {
  title: string;
  id: string | number;
  image: string;
  onClick: (id: string | number) => void;
  width: string | number;
  height: string | number;
  setFilmData: (data: { id: string | number; title: string }) => void;
  isActive: string | number | null;
}

const FilmCard = ({
  title,
  id,
  image,
  onClick,
  width,
  height,
  setFilmData,
  isActive,
}: FilmCardProps) => {
  const activeIndex = id === isActive;
  const titleId = `${id}-${title}`;
  return (
    <div
      id={titleId}
      className={
        'p-3 cardMD:pt-5 cardMD:pb-6 cardMD:w-[10.5rem] cardMD:ml-2 cardMD:flex-shrink-0'
      }
    >
      <img
        onClick={() => {
          onClick(id);
          setFilmData({
            id: id,
            title: title,
          });
        }}
        className={`rounded-2xl transition ease-in-out delay-600 hover:shadow-[0px_1px_12px_4px_rgba(130,166,237,0.1)] hover:border border-sky-200 border-opacity-10 hover:scale-110 	${activeIndex
            ? 'active animate-scaleCard shadow-[0px_0px_8px_4px_rgba(130,166,237,0.1)] border'
            : ' '
          }`}
        src={image}
        alt={title}
        style={{
          width: `${(Number(width) - 60) * 0.9}px`,
          height: `${(Number(height) - 100) * 0.9}px`,
          cursor: 'pointer',
        }}
      />
    </div>
  );
};

export default FilmCard;
