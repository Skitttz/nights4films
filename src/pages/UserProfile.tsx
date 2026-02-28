import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FilmsIdFromWatchListId_GET,
  showAvatar_GET,
  uploadAvatar_POST,
  userListFilms_GET,
  userProfile_GET,
} from '../api/index';
import noAvatar from '../assets/noAvatar.svg';
import Button from '../components/Forms/Button';
import CapitalizeLetter from '../components/Helper/CapitalizeLetter';
import Loading from '../components/Helper/Loading';
import Head from '../components/Helper/Head';
import { useUserContext } from '../hooks/useUser';

const UserProfile = () => {
  const { data, token } = useUserContext();
  const [files, setFiles] = useState<FileList | null>(null);

  const { data: profileRes, isLoading: loadingProfile } = useQuery({
    queryKey: ['profile', token],
    queryFn: async () => userProfile_GET(token as string),
    enabled: !!token,
  });

  const { data: watchListId } = useQuery({
    queryKey: ['watchId', token],
    queryFn: async () => userListFilms_GET(token as string),
    enabled: !!token,
  });

  const { data: listRes, isLoading: loadingList } = useQuery({
    queryKey: ['watchFilms', watchListId, token],
    queryFn: async () =>
      FilmsIdFromWatchListId_GET(watchListId as string, token as string),
    enabled: !!token && !!watchListId,
  });

  const { data: avatarUrl, isLoading: loadingAvatar, refetch: refetchAvatar } = useQuery({
    queryKey: ['avatar', token],
    queryFn: async () => {
      const resp = await showAvatar_GET(token as string);
      return resp?.avatar?.url ? `${resp.avatar.url}?t=${Date.now()}` : null;
    },
    enabled: !!token,
  });

  const stats = {
    numFilme: profileRes?.watchlist_films?.filmes?.length ?? 0,
    numLiked: profileRes?.like_films?.length ?? 0,
    numRated: profileRes?.rating_films?.length ?? 0,
  };

  function formatDateHour(dataHora: string) {
    const dataDate = new Date(dataHora);
    const dia = dataDate.getDate().toString().padStart(2, '0');
    const mes = (dataDate.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataDate.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  const uploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files || !files[0] || !token || !data?.id) return;
    const formData = new FormData();
    formData.append('ref', 'plugin::users-permissions.user');
    formData.append('refId', data.id);
    formData.append('field', 'avatar');
    formData.append('files', files[0]);
    formData.append('source', 'users-permissions');
    try {
      const response: any = await uploadAvatar_POST(formData, token);
      const newUrl = response?.[0]?.url ? `${response[0].url}?t=${Date.now()}` : null;
      if (newUrl) {
        await refetchAvatar();
      }
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
    } finally {
      // nada
    }
  };

  useEffect(() => {
    // placeholder caso precise efeitos locais no futuro
  }, []);

  if (!token || !data || loadingProfile) {
    return (
      <div className="max-w-7xl lg:max-w-5xl mt-16 mx-auto cardMD:p-4 tm:p-2 animate-animeDown xm:px-4">
        <Head title={' » Meu Perfil'} description="Pagina do Perfil" />
        <div className="pt-10 flex justify-center">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl lg:max-w-5xl mt-16 mx-auto cardMD:p-4 tm:p-2 animate-animeDown xm:px-4">
      <Head title={' » Meu Perfil'} description="Pagina do Perfil" />
      <div className="text-slate-200 font-roboto">
        <div className="flex items-center justify-center">
          <p className="text-3xl cardMD:text-2xl tm:text-xl font-light border-b border-b-slate-800 mb-12">
            <span>{'Bem-vindo ao seu perfil,'} </span>
            <span className="font-extrabold font-gabarito text-violet-600">{`${CapitalizeLetter(
              data.username,
            )}`}</span>{' '}
          </p>
        </div>
        <form
          className="grid gap-x-6 grid-cols-2 cardMD:grid-cols-2 tm:grid-cols-1 cardMD:gap-y-4 cardMD:justify-items-center cardMD:justify-center h-full "
          onSubmit={uploadImage}
        >
          <div className="flex flex-col gap-y-2 items-start cardMD:w-full">
            <div className="bg-slate-950 py-6 px-8 rounded-md w-full">
              <h4 className="inline-block text-2xl font-bold text-orange-200 px-2 py-1 mb-4 border-b border-b-slate-700 rounded-md">
                Meus Dados
              </h4>
              <p className="font-semibold mb-3">
                {'Email:'}{' '}
                <span className="font-light">{` ${data.email}`}</span>{' '}
              </p>
              <p className="font-semibold mb-3">
                {'Sua conta foi criada:'}{' '}
                <span className="font-light">{`${formatDateHour(
                  data.createdAt,
                )}`}</span>
              </p>
              <p className="font-semibold mb-3">
                {'Ultima alteracao do perfil:'}{' '}
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
                {'Filmes que gostou'}{' '}
                <span className="select-none font-bold bg-slate-700 py-1 px-2 rounded-md">
                  {stats.numLiked}
                </span>
              </p>
              <p className="font-semibold mb-3">
                {'Filmes listados'}{' '}
                <span className="select-none font-bold bg-slate-700 py-1 px-2 rounded-md">
                  {stats.numFilme}
                </span>
              </p>
              <p className="font-semibold mb-3">
                {'Filmes avaliados'}{' '}
                <span className="select-none font-bold bg-slate-700 py-1 px-2 rounded-md">
                  {stats.numRated}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-slate-950 w-full py-4 px-8 rounded-md flex flex-col items-center justify-center ">
            <p className="text-lg mb-2 font-semibold">Meu avatar</p>
            {loadingAvatar ? (
              <div className="w-[180px] h-[180px] mb-4 rounded-full flex justify-center">
                <Loading />
              </div>
            ) : avatarUrl ? (
              <img
                className="w-[180px] h-[180px] mb-4 rounded-full animate-fadeIn"
                src={avatarUrl}
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
                aria-label="Selecione sua foto de perfil"
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
            {'Minha Lista'}
          </p>
          <div className="flex tm:mx-auto tm:w-auto cardMD:overflow-y-auto gap-x-8 tm:gap-x-4 list-none">
            {loadingList ? (
              <Loading />
            ) : (
              <>
                {(listRes || []).length !== 0 ? (
                  (listRes || []).map((film: any) => (
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
                        <p className="mt-4 tm:my-4 font-gabarito font-semibold tm:text-sm text-center">
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
