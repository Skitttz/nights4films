import React from 'react';
import { useParams } from 'react-router-dom';
import { Filmes_GET, hostURL_GET } from '../Api/Api';
import Loading from '../Helper/Loading';
import Markdown from 'https://esm.sh/react-markdown@9';

const FilmView = () => {
  const [films, setFilms] = React.useState(null);
  const { id } = useParams();

  function randomColor() {
    return Math.floor(Math.random() * 256).toString(16);
  }

  function randomColorHEX() {
    return `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`;
  }

  const divRef = React.useRef(null);
  const pRef = React.useRef(null);

  React.useEffect(() => {
    const ruleSlug = `/filmes?filters[slug][$eq]`;
    const populatePhotoDescription = `populate=photo_description`;
    Filmes_GET(`${ruleSlug}=${id}&${populatePhotoDescription}`)
      .then((data) => {
        setFilms(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar filmes:', error);
      });
  }, [id]);

  React.useEffect(() => {
    const randomColorValueOne = randomColor();
    const randomColorValueTwo = randomColor();
    const randomColorHexOne = randomColorHEX();
    if (films) {
      pRef.current.style.boxShadow = `0px 0px 4px 0px rgba(${randomColorValueOne}, 30, ${randomColorValueTwo}, 1)`;
      divRef.current.style.boxShadow = `2px 0px 2px 0px ${randomColorHexOne}`;
    }
  }, [films]);

  return (
    <div>
      {films ? (
        <div
          className="grid justify-center bg-slate-950 mt-8 animate-animeLeft"
          key={films.data[0].id}
        >
          <div className="grid grid-cols-2 grid-rows-[.5fr,1fr] gap-y-8 content-center justify-items-center items-center animate-fadeIn max-w-5xl font-gabarito ">
            <img
              className="w-auto h-auto bg-contain rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] "
              src={`${hostURL_GET}${films.data[0].attributes.photo_description.data.attributes.url}`}
              alt=""
            />
            <div ref={divRef} className="p-3 rounded-lg ">
              <div className="text-center ">
                <p
                  ref={pRef}
                  className={`inline-block items-center text-slate-200 text-4xl p-4 border border-slate-300 border-opacity-10 rounded-xl  hover:animate-pulse`}
                >
                  {films.data[0].attributes.title}
                </p>
              </div>
              <div>
                <p className="text-slate-500 mt-3 mx-auto text-lg pl-6 text-justify font-roboto hover:text-slate-300 animate-fadeIn transition-colors py-1 ml-2">
                  <span className="inline-block font-gabarito text-slate-900 hover:text-slate-900 text-center p-1 bg-slate-200 rounded-s-md mr-3 ">
                    Sinopse:{' '}
                  </span>

                  {films.data[0].attributes.description}
                </p>
              </div>
            </div>
            <div className="col-span-full bg-gray-950 px-6 rounded-lg shadow-[rgba(55,44,_255,_1.3)_0px_1px_8px] mb-20 ">
              <p
                className={`inline-block mr-auto text-slate-200 text-4xl p-4 border border-slate-300 border-opacity-10 rounded-xl mt-5 `}
              >
                {`Curiosidades sobre ${films.data[0].attributes.title}`}
              </p>
              <div className="text-slate-300 whitespace-pre-line text-xl">
                <Markdown
                  components={{
                    li: ({ ordered, index, ...props }) => (
                      <li {...props}>
                        {ordered ? `${index + 1}.` : '―'} {props.children}
                      </li>
                    ),
                  }}
                >{`${films.data[0].attributes.curiosities}`}</Markdown>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default FilmView;
