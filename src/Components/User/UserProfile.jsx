import React from 'react';
import { useUserContext, tokenUserLocal } from '../../Hooks/useUser';
import {
  uploadAvatar_POST,
  showAvatar_GET,
  FilmsIdFromWatchListId_GET,
  userListFilms_GET,
  userProfile_GET,
} from '../Api/Api';
import Button from '../Forms/Button';
import { toast } from 'react-toastify';
import Head from '../Helper/Head';
import { Link } from 'react-router-dom';
import CustomLoading from '../Helper/CustomLoading';
import CapitalizeLetter from '../Helper/CapitalizeLetter';
import noAvatar from '../../Assets/noAvatar.svg';
import PaginationFilms from '../Films/PaginationFilms';

const UserProfile = () => {
  const { data } = useUserContext();
  const [files, setFiles] = React.useState();
  const [avatar, setAvatar] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [watchId, setWatchId] = React.useState();
  const [list, setList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [profileData, setProfileData] = React.useState({
    numFilme: 0,
    numLiked: 0,
    numRated: 0,
  });

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  async function avatarGet() {
    try {
      setLoading(true);
      const data = await showAvatar_GET(tokenUserLocal);
      const avatarUrl = data?.avatar?.url;
      if (!avatar) {
        setAvatar(avatarUrl);
      }
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  }

  const uploadImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('ref', 'plugin::users-permissions.user');
    formData.append('refId', data.id);
    formData.append('field', 'avatar');
    formData.append('files', files[0]);
    formData.append('source', 'users-permissions');
    try {
      setLoading(true);
      uploadAvatar_POST(formData, tokenUserLocal).then((response) => {
        setAvatar(response[0].url);
      });
      setLoading(false);
      toast.success('Avatar alterado com sucesso!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } catch (error) {
      console.error('Ops! Houve um problema ao carregar o avatar.', error);
    }
  };

  function formatDateHour(dataHora) {
    const data = new Date(dataHora);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  async function getListFilms(token) {
    try {
      userListFilms_GET(token).then((data) => setWatchId(data));
    } catch (err) {
      console.error('Error ao encontrar ID da lista', err);
    }
  }

  async function getIdFilms(watchListId, token) {
    try {
      await FilmsIdFromWatchListId_GET(watchListId, token).then((data) =>
        setList(data),
      );
    } catch (err) {
      console.error('Erro para achar os ID dos filmes', err);
    }
  }

  React.useEffect(() => {
    userProfile_GET(tokenUserLocal).then((response) => {
      setProfileData({
        numFilme: response.watchlist_films?.filmes?.length,
        numLiked: response.like_films.length,
        numRated: response.rating_films.length,
      });
    });

    getListFilms(tokenUserLocal).then(() => {
      if (watchId) {
        getIdFilms(watchId, tokenUserLocal);
      }
    });
  }, [watchId]);

  React.useEffect(() => {
    avatarGet();
  }, [avatar]);

  return (
    <div className="max-w-7xl lg:max-w-5xl mt-16 mx-auto cardMD:p-4 tm:p-2 animate-animeDown xm:px-4">
      <Head title={` » Meu Perfil`} description="Pagina do Perfil" />
      <div className="text-slate-200 font-roboto">
        <div className="flex items-center justify-center">
          <p className="text-3xl cardMD:text-2xl tm:text-xl font-light border-b border-b-slate-800 mb-12">
            <span>{`Bem-vindo ao seu perfil,`} </span>
            <span className="font-extrabold font-gabarito text-violet-600">{`${CapitalizeLetter(
              data.username,
            )}`}</span>{' '}
          </p>
        </div>
        <form
          className="grid gap-x-6 grid-cols-2 cardMD:grid-cols-1 cardMD:gap-y-4 cardMD:justify-items-center cardMD:justify-center h-full "
          onSubmit={uploadImage}
        >
          <div className="flex flex-col gap-y-2 items-start">
            <div className="bg-slate-950 py-6 px-8 rounded-md w-full">
              <h4 className="inline-block text-2xl font-bold text-orange-200 px-2 py-1 mb-4 border-b border-b-slate-700 rounded-md">
                Meus Dados
              </h4>
              <p className="font-semibold mb-3">
                {`Email:`}{' '}
                <span className="font-light">{` ${data.email}`}</span>{' '}
              </p>
              <p className="font-semibold mb-3">
                {`Sua conta foi criada:`}{' '}
                <span className="font-light">{`${formatDateHour(
                  data.createdAt,
                )}`}</span>
              </p>
              <p className="font-semibold mb-3">
                {`Ultima alteracao do perfil:`}{' '}
                <span className="font-light">{`${formatDateHour(
                  data.updatedAt,
                )}`}</span>
              </p>
            </div>
            <div className="bg-slate-950 py-6 px-8 rounded-md w-full">
              <h4 className="inline-block text-2xl mb-4 font-bold text-purple-400 px-2 py-1 border-b border-b-slate-700 rounded-md">
                Minhas Atividades
              </h4>
              <p className="font-semibold mb-3">
                {`Filmes que gostou`}{' '}
                <span className="select-none font-bold bg-slate-700 py-1 px-2 rounded-md">
                  {profileData.numLiked}
                </span>
              </p>
              <p className="font-semibold mb-3">
                {`Filmes listados`}{' '}
                <span className="select-none font-bold bg-slate-700 py-1 px-2 rounded-md">
                  {profileData.numFilme}
                </span>
              </p>
              <p className="font-semibold mb-3">
                {`Filmes avaliados`}{' '}
                <span className="select-none font-bold bg-slate-700 py-1 px-2 rounded-md">
                  {profileData.numRated}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-slate-950 tm:w-[90%] py-4 px-8 rounded-md flex flex-col items-center justify-center ">
            <p className="text-lg mb-2 font-semibold">Meu avatar</p>
            {loading ? (
              <div className="w-[180px] h-[180px] mb-4 rounded-full flex justify-center">
                <CustomLoading />
              </div>
            ) : avatar ? (
              <img
                className="w-[180px] h-[180px] mb-4 rounded-full animate-fadeIn"
                src={avatar}
                alt=""
              />
            ) : (
              <img
                className="w-[180px] h-[180px] mb-4 rounded-full"
                src={noAvatar}
                alt=""
              />
            )}

            <div className="flex flex-col gap-y-2">
              <input
                className="block w-full text-normal text-slate-500 
              file:mr-2 file:py-2 file:px-4 file:rounded-md
              file:border-0 file:text-sm file:font-semibold
              file:bg-orange-900 file:text-slate-100 
              hover:file:bg-orange-600 file:cursor-pointer"
                type="file"
                onChange={(e) => setFiles(e.target.files)}
              />
              <div className="flex gap-x-2">
                <Button
                  customStyle={
                    'w-full mt-3 opacity-90 hover:opacity-100 hover:opacity-100 p-2 border-violet-800 bg-violet-800 hover:bg-violet-700 transition-all font-bold rounded-lg'
                  }
                >
                  Salvar
                </Button>
              </div>
            </div>
          </div>
        </form>

        <div className="pt-12">
          <p className="text-3xl cardMD:text-2xl font-roboto border-b border-b-slate-800 mb-4">
            <span className="text-2xl"></span> {`Minha Lista`}
          </p>
          <div className="flex tm:mx-auto tm:w-auto cardMD:overflow-y-auto gap-x-8 tm:gap-x-4 list-none">
            {loading ? (
              <CustomLoading />
            ) : (
              <>
                {list.length !== 0 ? (
                  list.map((film) => (
                    <div
                      className="flex-grow-1 tm:flex-grow-0 basis-[160px] w-full sm:mx-auto animate-fadeIn tm:px-4"
                      key={film.id}
                    >
                      <Link to={`/filmes/${film.attributes.slug}`}>
                        <img
                          className="max-w-fit w-[160px] h-[240px] rounded-md box-shadow: 4.0px 8.0px 8.0px rgba(0,0,0,0.38) hover:scale-110 transition-all"
                          src={film.attributes.card.data.attributes.url}
                          alt=""
                        />
                        <p className="mt-2 tm:my-4 font-gabarito font-semibold tm:text-sm text-center">
                          {film.attributes.title}
                        </p>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="w-full">
                    <p className="font-roboto text-center text-lg font-bold animate-fadeIn">
                      Até o momento, você ainda não adicionou nenhum filme à sua
                      lista
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
