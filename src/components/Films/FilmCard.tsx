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
      data-film-id={id}
      className={
        'p-3 cardMD:pt-5 cardMD:pb-6 cardMD:w-[10.5rem] cardMD:ml-2 cardMD:flex-shrink-0'
      }
    >
      <button type="button" aria-label={`Selecionar ${title}`} aria-pressed={activeIndex}
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
        style={{ width: Number(width), cursor: 'pointer' }}>
        {image ? <img src={image} alt={title} loading="lazy" width={Number(width)} height={Number(height)} className="w-full rounded-2xl object-cover aspect-[2/3]" /> : <span className="flex items-center justify-center rounded-2xl bg-slate-800 text-slate-300 aspect-[2/3]">{title}</span>}
      </button>
    </div>
  );
};

export default FilmCard;
