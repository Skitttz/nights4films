import React from 'react';

interface ReadMoreProps {
  text: string;
  textAlert: string;
  textUnderline: string;
  hasSpoiler: boolean;
  reviewId?: any;
  maxLength: number;
}

const ReadMore = ({
  text,
  textAlert,
  textUnderline,
  hasSpoiler,
  reviewId,
  maxLength,
}: ReadMoreProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const cutText = text.length > maxLength;
  const showText = isExpanded ? text : text.slice(0, maxLength);
  const [showSpoiler, setShowSpoiler] = React.useState(hasSpoiler);

  return (
    <span
      className={`${showSpoiler ? 'italic text-slate-400' : ''}`}
      onClick={() => {
        if (hasSpoiler === true) {
          setShowSpoiler(false);
        }
      }}
    >
      {showSpoiler ? textAlert : showText}
      <span className="underline underline-offset-[2px] cursor-pointer text-slate-200 hover:text-yellow-600">
        {showSpoiler ? textUnderline : ''}
      </span>
      {!showSpoiler && cutText && (
        <a
          className="ml-2 bg-slate-50 text-slate-950 p-1 text-xs rounded-lg cursor-pointer font-gabarito"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Mostrar menos' : 'Leia Mais'}
        </a>
      )}
    </span>
  );
};

export default ReadMore;
