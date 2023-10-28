import React from 'react';
import { useUserContext, tokenUserLocal } from '../../Hooks/useUser';
import {
  uploadAvatar_POST,
  showAvatar_GET,
  FilmsIdFromWatchListId_GET,
  userListFilms_GET,
} from '../Api/Api';
import Button from '../Forms/Button';
import { toast } from 'react-toastify';
import Head from '../Helper/Head';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { data } = useUserContext();
  const [files, setFiles] = React.useState();
  const [avatar, setAvatar] = React.useState(null);

  const [watchId, setWatchId] = React.useState();
  const [list, setList] = React.useState([]);

  async function avatarGet() {
    try {
      const data = await showAvatar_GET(tokenUserLocal);
      setAvatar(data.avatar.url);
    } catch (error) {
      return null; //Error user not have avatar
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
      uploadAvatar_POST(formData, tokenUserLocal).then((response) => {
        setAvatar(response[0].url);
      });
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
      console.error('Houve um erro para subir o avatar', error);
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
    getListFilms(tokenUserLocal);
    if (watchId) {
      getIdFilms(watchId, tokenUserLocal);
    }
    avatarGet();
  }, [watchId]);

  return (
    <div className="max-w-5xl mt-16 mx-auto cardMD:p-4 tm:p-2 animate-animeDown">
      <Head title={` » Meu Perfil`} description="Pagina do Perfil" />
      <div className="text-slate-200 font-roboto">
        <p className="text-3xl cardMD:text-2xl tm:text-xl font-light border-b border-b-slate-800 mb-4">
          {`Bem-vindo ao seu perfil,`}{' '}
          <span className="font-extrabold font-gabarito text-violet-600">{`${data.username}`}</span>
        </p>
        <form
          className="grid gap-x-6 grid-cols-2 cardMD:grid-cols-1 cardMD:gap-y-4 cardMD:justify-items-center cardMD:justify-center "
          onSubmit={uploadImage}
        >
          <div className="bg-slate-950 py-4 px-8 rounded-md flex flex-col gap-y-2 items-start">
            <p className="text-2xl font-bold text-orange-200 px-2 py-1 mb-2 border-b border-b-slate-700 rounded-md">
              Meus Dados
            </p>
            <p className="font-semibold">
              {`Email:`} <span className="font-light">{` ${data.email}`}</span>{' '}
            </p>
            <p className="font-semibold">
              {`Sua conta foi criada:`}{' '}
              <span className="font-light">{`${formatDateHour(
                data.createdAt,
              )}`}</span>
            </p>
            <p className="font-semibold">
              {`Ultima atualização:`}{' '}
              <span className="font-light">{`${formatDateHour(
                data.updatedAt,
              )}`}</span>
            </p>
          </div>
          <div className="bg-slate-950 tm:w-[90%] py-4 px-8 rounded-md flex flex-col items-center justify-center ">
            <p className="text-lg mb-2 font-semibold">Meu avatar</p>
            <img className="w-[30%] mb-4 rounded-full" src={avatar} alt="" />
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
              <Button
                customStyle={
                  'w-full mt-3 opacity-90 hover:opacity-100 hover:opacity-100 p-2 border-violet-800 bg-slate-800 hover:bg-violet-800 transition-all font-bold rounded-lg'
                }
              >
                Salvar
              </Button>
            </div>
          </div>
        </form>
        <div className="mt-12">
          <p className="text-2xl cardMD:text-2xl font-mono border-b border-b-slate-800 mb-4">
            {`Minha Lista`}
          </p>
          <div className="flex flex-wrap gap-x-8 list-none">
            {list.map((film) => (
              <div
                className="flex-grow-1 basis-[160px] sm:mx-auto"
                key={film.id}
              >
                <Link to={`/filmes/${film.attributes.slug}`}>
                  <img
                    className="w-[160px] rounded-md box-shadow: 4.0px 8.0px 8.0px rgba(0,0,0,0.38) hover:scale-110 transition-all"
                    src={film.attributes.card.data.attributes.url}
                    alt=""
                  />
                  <p className="mt-2 font-gabarito font-semibold tm:text-xs text-center">
                    {film.attributes.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
